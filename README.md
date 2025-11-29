# ShadeOTC SDK Monorepo

![ShadeOTC banner](public/banner.jpg)

ShadeOTC provides a complete toolkit for generating, verifying, and submitting Zero-Knowledge (ZK) proofs on Solana. It combines a Noir-based circuit workflow, a TypeScript backend SDK, and an Anchor-based on-chain verifier scaffold.

This repository contains everything required to prototype and integrate ZK proofs into backend services and Solana programs. It includes local and remote adapters for proving and verification, example servers, documentation, and an Anchor program that accepts proof submissions.

Contents

- Overview — brief project description
- Architecture — repository layout
- Quickstart — essential commands to get started
- Noir artifacts — how to build and replace placeholders
- On-chain (Anchor) — build & deploy notes
- Contributing — how to help

Repository layout

shadeotc/
- packages/sdk/        -> TypeScript SDK, Noir loader, Solana helpers, Anchor program scaffold
- apps/docs/           -> Documentation site (Next.js + Tailwind)
- examples/            -> Example servers (Express, Fastify)
- scripts/             -> Helper scripts (build-noir, deploy-devnet, CI)

Quickstart (PowerShell)

Prerequisites:
- Node.js (v18+), `pnpm`
- Rust + Anchor CLI + Solana CLI (if building the on-chain program)
- Noir toolchain (if you want to build circuits locally)

Get started:

```powershell
cd D:\Project\SDK-DATA\shadeotc
pnpm install
pnpm -w build
```

Generate placeholder Noir artifacts (development):

```powershell
sh scripts/build-noir.sh
# If you have the Noir toolchain installed, replace the placeholder commands with the real 'noir' invocation.
```

Run SDK tests:

```powershell
pnpm -w test
```

Run the documentation site locally:

```powershell
pnpm --filter @shadeotc/docs dev
```

Deploy Anchor program to devnet (requires Anchor & Solana CLI):

```powershell
$env:ANCHOR_WALLET = "$env:USERPROFILE/.config/solana/id.json"
$env:RPC_URL = "https://api.devnet.solana.com"
sh scripts/deploy-devnet.sh
```

Noir circuits & artifacts

Example circuit location: `packages/sdk/src/noir/circuits/otc/circuit.nr` (currently a minimal example).

After compilation, the SDK expects the following artifacts alongside the circuit:

- `witness.wasm` — wasm used by local prover (when using `@noir-lang/noir_wasm`)
- `proving_key.pk` — proving key
- `verification_key.vk` — verification key

Example build steps (adjust for your Noir toolchain):

```bash
# Example (Linux / macOS)
noir compile packages/sdk/src/noir/circuits/otc/circuit.nr --target acir
noir setup packages/sdk/src/noir/circuits/otc/circuit.nr --out packages/sdk/src/noir/circuits/otc --name otc
```

After building, replace the placeholder files in `packages/sdk/src/noir/circuits/otc/` with the real artifacts.

Local prover & verifier (noir_wasm)

The SDK supports both remote HTTP-based provers and a local wasm-based prover via `@noir-lang/noir_wasm`. The code attempts to dynamically import `noir_wasm` and will use it when available and when the required artifacts (`witness.wasm`, `proving_key.pk`, `verification_key.vk`) are present.

To enable local proving:

1. Install the noir_wasm package for the SDK package:

```powershell
pnpm --filter @shadeotc/sdk add @noir-lang/noir_wasm
```

2. Build Noir artifacts and ensure `witness.wasm`, `proving_key.pk`, and `verification_key.vk` are present in `packages/sdk/src/noir/circuits/otc/`.

3. Call the SDK `createOTCProof` API from your code — it will use the local wasm prover if available, or fall back to the remote prover adapter.

Note: The actual `noir_wasm` API may vary by version. The SDK attempts a best-effort integration and includes fallbacks; consult the `packages/sdk/src/core/zkProver.ts` and `packages/sdk/src/core/zkVerifier.ts` files to adapt to different `noir_wasm` method names.

On-chain program (Anchor)

Location: `packages/sdk/onchain/programs/shade_otc_verifier`

Current features:

- `submit_proof` instruction — stores a `ProofRecord` and emits a `ProofSubmitted` event
- `verify_proof_onchain` instruction — placeholder verification. For full on-chain ZK verification, enable the `onchain_verifier` Cargo feature and link an appropriate verifier crate.

Build & test:

```powershell
cd packages/sdk/onchain
anchor build
anchor test
```

Deploy (devnet): use `scripts/deploy-devnet.sh` and ensure the wallet and RPC environment variables are set.

High-level flow

1. Backend constructs an `OTCOrder` input.
2. SDK generates a proof (local wasm or remote service) and public signals.
3. Optionally verify the proof locally with SDK verifier.
4. Submit the proof to the Anchor program via a Solana transaction (`submit_proof`).
5. Program stores a record and emits an event.

Contributing

We welcome contributions. Short guide:

1. Fork the repository and create a feature branch.
2. Follow the project's code style and run tests: `pnpm -w test`.
3. Open a pull request with a clear description of your changes.

See `apps/docs` for more detailed documentation and examples.

License

This project is licensed under the MIT License — see the `LICENSE` file for details. 