import { describe, it, expect } from 'vitest'
import { ZkProver } from '../src/core/zkProver'

describe('ZkProver', () => {
  it('generates a mock proof locally', async () => {
    const prover = new ZkProver({ circuitPath: __dirname + '/fixtures/mock-proof.json' })
    const out = await prover.generate({ maker: 'A', taker: 'B', asset: 'TOKEN', amount: 1 })
    expect(out).toHaveProperty('proof')
    expect(out.publicSignals).toBeDefined()
  })
})
