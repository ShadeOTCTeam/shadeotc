use anchor_lang::prelude::*;
use crate::instructions::*;
use crate::state::*;

declare_id!("ShadeOTC1111111111111111111111111111111111111");

#[program]
pub mod shade_otc_verifier {
    use super::*;

    pub fn submit_proof(ctx: Context<SubmitProof>, proof: Vec<u8>, public_signals: Vec<Vec<u8>>) -> Result<()> {
        instructions::submit_proof(ctx, proof, public_signals)
    }

    pub fn verify_proof_onchain(ctx: Context<VerifyProof>, proof: Vec<u8>, public_signals: Vec<Vec<u8>>) -> Result<bool> {
        instructions::verify_proof_onchain(ctx, proof, public_signals)
    }
}
