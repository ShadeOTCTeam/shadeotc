# On-chain Anchor program (shade_otc_verifier)

This program stores submitted proofs and emits `ProofSubmitted` events. The `verify_proof_onchain` instruction contains a placeholder—enable the `onchain_verifier` feature and link a verifier crate for real ZK verification.

Build & test (local):

```bash
cd packages/sdk/onchain
anchor build
anchor test
```

To deploy to devnet:

```bash
export ANCHOR_WALLET=~/.config/solana/id.json
export RPC_URL=https://api.devnet.solana.com
sh ../../../scripts/deploy-devnet.sh
```
