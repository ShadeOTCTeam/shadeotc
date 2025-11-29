import { ZkProver } from './zkProver'
import { ZkVerifier } from './zkVerifier'
import { Connection, PublicKey, Transaction, Keypair } from '@solana/web3.js'
import { getConnection, sendAndConfirm } from '../solana/connection'
import { Program } from '@project-serum/anchor'
import { SDKError, OTCOrder, OTCProof } from './zkTypes'
import { log } from '../utils/logger'
import { loadIdl } from '../solana/program'

export class ShadeOTC {
  private prover: ZkProver
  private verifier: ZkVerifier
  private rpc: string
  private programId?: string

  constructor(opts: { proverUrl?: string; circuitPath?: string; vkPath?: string; solanaRpc?: string; programId?: string }) {
    this.prover = new ZkProver({ circuitPath: opts.circuitPath, remoteUrl: opts.proverUrl })
    this.verifier = new ZkVerifier({ vkPath: opts.vkPath })
    this.rpc = opts.solanaRpc || 'https://api.devnet.solana.com'
    this.programId = opts.programId
  }

  async createOTCProof(params: OTCOrder): Promise<OTCProof> {
    try {
      const { proof, publicSignals } = await this.prover.generate(params as any)
      return { proof, publicSignals }
    } catch (err: any) {
      log.error('createOTCProof error', err)
      throw new SDKError('Failed to create OTC proof')
    }
  }

  async verifyOTCProof(proof: Uint8Array | string, publicSignals: any) {
    try {
      const ok = await this.verifier.verify(proof, publicSignals)
      return ok
    } catch (err: any) {
      log.error('verifyOTCProof error', err)
      throw new SDKError('Failed to verify OTC proof')
    }
  }

  async submitProofToSolana(proof: Uint8Array | string, publicSignals: any, payer: Keypair) {
    const conn = getConnection(this.rpc)
    if (!this.programId) throw new SDKError('programId not configured')
    const idl = await loadIdl(this.programId, conn)
    const program = new Program(idl as any, new PublicKey(this.programId))

    // Build instruction: submit_proof
    // Note: depending on proof size you may need to chunk the proof. We send as single arg here.
    const tx = await program.rpc.submitProof(Buffer.from(typeof proof === 'string' ? proof : Buffer.from(proof)), [Buffer.from(JSON.stringify(publicSignals))], {
      accounts: {},
      signers: [payer],
    } as any)

    log.info('submitted tx', tx)
    return tx
  }
}
