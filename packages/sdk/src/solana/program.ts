import fs from 'fs'
import path from 'path'
import { Connection, PublicKey } from '@solana/web3.js'

export async function loadIdl(programId: string, connection: Connection) {
  // Attempt to load IDL from packages/sdk/onchain/target/idl
  const idlPath = path.resolve(__dirname, '..', 'onchain', 'programs', 'shade_otc_verifier', 'target', 'idl', 'shade_otc_verifier.json')
  if (fs.existsSync(idlPath)) {
    return JSON.parse(fs.readFileSync(idlPath, 'utf8'))
  }

  // As a fallback, return a minimal IDL shape for submit_proof
  return {
    version: '0.1.0',
    name: 'shade_otc_verifier',
    instructions: [
      { name: 'submit_proof', accounts: [], args: [{ name: 'proof', type: 'bytes' }, { name: 'publicSignals', type: { vec: 'bytes' } }] },
      { name: 'verify_proof_onchain', accounts: [], args: [{ name: 'proof', type: 'bytes' }, { name: 'publicSignals', type: { vec: 'bytes' } }] }
    ]
  }
}
