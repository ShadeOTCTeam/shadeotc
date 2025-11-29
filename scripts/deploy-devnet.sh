#!/usr/bin/env bash
set -euo pipefail
echo "Building Anchor program and deploying to devnet"
if ! command -v anchor >/dev/null 2>&1; then
  echo "anchor CLI not found. Install via: cargo install --git https://github.com/coral-xyz/anchor --tag v0.27.0 anchor-cli"
  exit 1
fi

export ANCHOR_WALLET=${ANCHOR_WALLET:-$HOME/.config/solana/id.json}
export CLUSTER=${RPC_URL:-https://api.devnet.solana.com}

cd packages/sdk/onchain
anchor build
solana config set --url $CLUSTER
anchor deploy --provider.cluster devnet

echo "Deployed (check Anchor output above)"
