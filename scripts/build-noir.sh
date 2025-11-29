#!/usr/bin/env bash
set -euo pipefail
echo "Building Noir circuit artifacts (placeholder)"
echo "This script is a helper: replace the commands with your Noir toolchain invocation."

# Example (requires noir toolchain):
# noir compile packages/sdk/src/noir/circuits/otc/circuit.nr --target acir
# noir setup packages/sdk/src/noir/circuits/otc/circuit.nr --out packages/sdk/src/noir/circuits/otc --name otc

echo "Writing placeholder proving_key, verification_key, and witness.wasm files"
BASE=packages/sdk/src/noir/circuits/otc
echo "PK_PLACEHOLDER" > "$BASE/proving_key.pk"
echo "VK_PLACEHOLDER" > "$BASE/verification_key.vk"
echo "WASM_PLACEHOLDER" > "$BASE/witness.wasm"

echo "Done. Replace placeholders with real artifacts produced by the Noir toolchain."
