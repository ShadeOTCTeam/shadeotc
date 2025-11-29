export type OTCOrder = {
  maker: string
  taker: string
  asset: string
  amount: number | string
}

export type OTCProof = {
  proof: Uint8Array | string
  publicSignals: any
}

export type ProofResult = {
  ok: boolean
  reason?: string
}

export type VerificationResult = {
  valid: boolean
  details?: any
}

export class SDKError extends Error {
  code?: string
  constructor(message: string, code?: string) {
    super(message)
    this.name = 'SDKError'
    this.code = code
  }
}
