// Dummy Noir circuit for OTC example.
// Replace with your real circuit. This file is intentionally minimal.

def main(maker: field, taker: field, asset: field, amount: field) -> (field):
  // simple check: amount > 0 (toy example)
  assert(amount != 0)
  return 1
