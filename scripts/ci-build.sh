#!/usr/bin/env bash
set -euo pipefail
echo "Bootstrapping workspace..."
pnpm install
pnpm -w build
echo "Build complete"
