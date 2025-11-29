import fs from 'fs'
import path from 'path'

export type NoirArtifacts = {
  circuit: string
  provingKey?: Uint8Array
  verificationKey?: Uint8Array
  witnessWasm?: Uint8Array
}

export async function loadNoirArtifacts(basePath: string): Promise<NoirArtifacts> {
  const circuitPath = path.resolve(basePath)
  const proofKeyPath = path.resolve(path.dirname(circuitPath), 'proving_key.pk')
  const verKeyPath = path.resolve(path.dirname(circuitPath), 'verification_key.vk')

  const artifacts: NoirArtifacts = {
    circuit: circuitPath,
  }

  if (fs.existsSync(proofKeyPath)) {
    artifacts.provingKey = fs.readFileSync(proofKeyPath)
  }
  if (fs.existsSync(verKeyPath)) {
    artifacts.verificationKey = fs.readFileSync(verKeyPath)
  }
  const wasmPath = path.resolve(path.dirname(circuitPath), 'witness.wasm')
  if (fs.existsSync(wasmPath)) {
    artifacts.witnessWasm = fs.readFileSync(wasmPath)
  }

  return artifacts
}
