import { describe, it, expect } from 'vitest'
import { ZkVerifier } from '../src/core/zkVerifier'
import fixture from './fixtures/mock-proof.json'

describe('ZkVerifier', () => {
  it('verifies mock proof', async () => {
    const v = new ZkVerifier({})
    const valid = await v.verify(Buffer.from('mock-proof'), fixture.publicSignals)
    expect(valid).toBe(true)
  })
})
