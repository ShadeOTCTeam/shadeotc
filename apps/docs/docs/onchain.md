# On-Chain Program

The Anchor program `shade_otc_verifier` accepts proof bytes and public signals, stores a record and emits a `ProofSubmitted` event. The on-chain verification is feature-gated (`onchain_verifier`) and can be linked to a verifier crate when available.
