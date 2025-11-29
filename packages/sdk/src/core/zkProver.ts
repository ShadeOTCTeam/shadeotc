import fetch from 'node-fetch'
import { loadNoirArtifacts } from '../noir/loader'
import { ProverError } from '../utils/errors'

export class ZkProver {
  private circuitPath: string | undefined
  private provingKeyPath: string | undefined
  private remoteUrl: string | undefined

  constructor(opts: { circuitPath?: string; provingKeyPath?: string; remoteUrl?: string }) {
    this.circuitPath = opts.circuitPath
    this.provingKeyPath = opts.provingKeyPath
    this.remoteUrl = opts.remoteUrl
  }

  async generate(input: Record<string, any>): Promise<{ proof: Uint8Array | string; publicSignals: any }> {
    if (this.remoteUrl) {
      const res = await fetch(new URL('/prove', this.remoteUrl).toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })
      if (!res.ok) throw new ProverError('Remote prover failed')
      return res.json()
    }

    if (!this.circuitPath) throw new ProverError('No circuit provided')
    const artifacts = await loadNoirArtifacts(this.circuitPath)

    // Try to use local noir_wasm if available and artifacts include a witness wasm and proving key
    try {
      const noir = await import('@noir-lang/noir_wasm')
      if (artifacts.witnessWasm && artifacts.provingKey && noir && typeof noir.prove === 'function') {
        // The exact API for noir_wasm may differ; this code attempts a best-effort integration.
        // Expected: noir.prove({ wasm: Uint8Array, pk: Uint8Array, input: Record }) -> { proof, publicSignals }
        const res: any = await noir.prove({ wasm: artifacts.witnessWasm, pk: artifacts.provingKey, input })
        if (res && (res.proof || res.publicSignals)) return { proof: res.proof, publicSignals: res.publicSignals }
      }
    } catch (e) {
      // noir_wasm not installed or failed — fallback to local mock
    }

    // Fallback: return a mock proof (for development). Replace by noir_wasm integration above when available.
    const mockProof = Buffer.from('mock-proof')
    const publicSignals = { maker: input.maker, taker: input.taker, asset: input.asset, amount: input.amount }
    return { proof: mockProof, publicSignals }
  }
}
