import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'

export function getConnection(rpcUrl?: string) {
  const url = rpcUrl || clusterApiUrl('devnet')
  return new Connection(url, 'confirmed')
}

export async function airdropIfNeeded(connection: Connection, pubkey: Keypair['publicKey'], minBalanceSol = 0.5) {
  const bal = await connection.getBalance(pubkey as any)
  if (bal < minBalanceSol * LAMPORTS_PER_SOL) {
    await connection.requestAirdrop(pubkey as any, Math.ceil(minBalanceSol * LAMPORTS_PER_SOL))
  }
}

export async function sendAndConfirm(connection: Connection, tx: any, signers: any[]) {
  return connection.sendTransaction(tx, signers)
}
