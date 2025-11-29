# Noir Circuits Guide

Place Noir circuits under `packages/sdk/src/noir/circuits/otc`. Use `scripts/build-noir.sh` to compile `.nr` to wasm, proving key and verification key.

Example build command (requires Noir toolchain):

```bash
noir compile packages/sdk/src/noir/circuits/otc/circuit.nr --target acir
noir prove packages/sdk/src/noir/circuits/otc/circuit.nr --output packages/sdk/src/noir/circuits/otc/witness.wasm
```
