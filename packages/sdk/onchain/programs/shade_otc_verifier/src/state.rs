use anchor_lang::prelude::*;

#[account]
pub struct ProofRecord {
    pub submitter: Pubkey,
    pub proof_hash: [u8; 32],
    pub slot: u64,
    pub raw_proof: Vec<u8>,
}

impl ProofRecord {
    pub const MAX_SIZE: usize = 32 + 32 + 8 + 1024; // rough sizing
}

#[event]
pub struct ProofSubmitted {
    pub submitter: Pubkey,
    pub proof_hash: [u8; 32],
    pub slot: u64,
}
