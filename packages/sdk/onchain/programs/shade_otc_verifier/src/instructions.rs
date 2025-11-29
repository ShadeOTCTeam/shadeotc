use anchor_lang::prelude::*;
use crate::state::*;
use sha2::{Digest, Sha256};

#[derive(Accounts)]
pub struct SubmitProof<'info> {
    #[account(init_if_needed, payer = submitter, space = 8 + ProofRecord::MAX_SIZE, seeds=[b"proof", &Clock::get().unwrap().slot.to_be_bytes()], bump)]
    pub proof_account: Account<'info, ProofRecord>,
    #[account(mut)]
    pub submitter: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn submit_proof(ctx: Context<SubmitProof>, proof: Vec<u8>, public_signals: Vec<Vec<u8>>) -> Result<()> {
    let submitter = ctx.accounts.submitter.key();
    let mut hasher = Sha256::new();
    hasher.update(&proof);
    let proof_hash = hasher.finalize();

    let rec = &mut ctx.accounts.proof_account;
    rec.submitter = submitter;
    rec.proof_hash = proof_hash.as_slice().try_into().unwrap_or([0u8;32]);
    rec.slot = Clock::get()?.slot;
    rec.raw_proof = proof;
    emit!(ProofSubmitted { submitter, proof_hash: rec.proof_hash, slot: rec.slot });
    Ok(())
}

#[derive(Accounts)]
pub struct VerifyProof<'info> {
    pub verifier: Signer<'info>,
}

pub fn verify_proof_onchain(_ctx: Context<VerifyProof>, proof: Vec<u8>, _public_signals: Vec<Vec<u8>>) -> Result<bool> {
    // Placeholder verification: in real usage, enable `onchain_verifier` feature and link to verifier crate.
    // For now, accept proofs longer than a small threshold and return true/false.
    if proof.len() < 4 { 
        return Ok(false);
    }
    // TODO: If compiled with `onchain_verifier` feature, route to real verifier here.
    Ok(true)
}
