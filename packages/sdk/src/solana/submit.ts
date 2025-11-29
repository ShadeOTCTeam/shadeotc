import { Connection, PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js'

export async function buildSubmitProofIx(programId: PublicKey, proofBytes: Buffer, publicSignals: Buffer[]) {
  // Simple instruction serialization: first arg is proof bytes, second is list of signals
  const data = Buffer.concat([proofBytes, Buffer.from([0])])
  return new TransactionInstruction({ keys: [], programId, data })
}

export async function submitProof(connection: Connection, programId: PublicKey, proof: Buffer, publicSignals: Buffer[], payer: any) {
  const ix = await buildSubmitProofIx(programId, proof, publicSignals)
  const tx = new Transaction().add(ix)
  const sig = await connection.sendTransaction(tx, [payer])
  await connection.confirmTransaction(sig)
  return sig
}
