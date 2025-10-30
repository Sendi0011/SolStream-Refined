use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

declare_id!("11111111111111111111111111111111"); // Replace with your program ID after deployment

#[program]
pub mod solstream_rewards {
    use super::*;

    /// Initialize the global state (admin only, one-time setup)
    pub fn initialize_global_state(
        ctx: Context<InitializeGlobalState>,
        conversion_rate: u64,
    ) -> Result<()> {
        let state = &mut ctx.accounts.global_state;
        state.admin = ctx.accounts.admin.key();
        state.conversion_rate = conversion_rate; // e.g., 1000 points = 1 SOL
        state.total_points_distributed = 0;
        state.bump = ctx.bumps.global_state;
        
        msg!("Global state initialized with conversion rate: {}", conversion_rate);
        Ok(())
    }

    /// Create a new user account (fan or artist)
    pub fn create_user(
        ctx: Context<CreateUser>,
        user_type: UserType,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user_account;
        user.owner = ctx.accounts.signer.key();
        user.user_type = user_type;
        user.points = 0;
        user.total_earned = 0;
        user.total_redeemed = 0;
        user.bump = ctx.bumps.user_account;
        
        msg!("User created: {:?}", user_type);
        Ok(())
    }

    /// Record activity and award points (backend-signed transaction)
    pub fn record_activity(
        ctx: Context<RecordActivity>,
        points: u64,
        activity_type: ActivityType,
    ) -> Result<()> {
        require!(points > 0, ErrorCode::InvalidPoints);
        
        let user = &mut ctx.accounts.user_account;
        let state = &mut ctx.accounts.global_state;
        
        // Add points to user
        user.points = user.points
            .checked_add(points)
            .ok_or(ErrorCode::Overflow)?;
        
        user.total_earned = user.total_earned
            .checked_add(points)
            .ok_or(ErrorCode::Overflow)?;
        
        // Track global distribution
        state.total_points_distributed = state.total_points_distributed
            .checked_add(points)
            .ok_or(ErrorCode::Overflow)?;
        
        msg!("Activity recorded: {:?}, Points awarded: {}", activity_type, points);
        Ok(())
    }

    /// Redeem points for SOL
    pub fn redeem_points(ctx: Context<RedeemPoints>) -> Result<()> {
        let user = &mut ctx.accounts.user_account;
        let state = &ctx.accounts.global_state;
        
        // Check minimum threshold (1000 points)
        require!(user.points >= 1000, ErrorCode::InsufficientPoints);
        
        // Calculate SOL amount based on conversion rate
        // conversion_rate = points per SOL (e.g., 1000 points = 1 SOL)
        let lamports_to_transfer = (user.points as u128)
            .checked_mul(1_000_000_000) // Convert to lamports
            .ok_or(ErrorCode::Overflow)?
            .checked_div(state.conversion_rate as u128)
            .ok_or(ErrorCode::InvalidConversionRate)?
            as u64;
        
        // Check vault has enough balance
        require!(
            ctx.accounts.reward_vault.lamports() >= lamports_to_transfer,
            ErrorCode::InsufficientVaultBalance
        );
        
        // Transfer SOL from vault to user
        let seeds = &[
            b"vault",
            &[state.bump],
        ];
        let signer_seeds = &[&seeds[..]];
        
        let cpi_context = CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.reward_vault.to_account_info(),
                to: ctx.accounts.user.to_account_info(),
            },
            signer_seeds,
        );
        
        transfer(cpi_context, lamports_to_transfer)?;
        
        // Update user stats
        let redeemed_points = user.points;
        user.total_redeemed = user.total_redeemed
            .checked_add(redeemed_points)
            .ok_or(ErrorCode::Overflow)?;
        user.points = 0; // Reset points after redemption
        
        msg!("Redeemed {} points for {} lamports", redeemed_points, lamports_to_transfer);
        Ok(())
    }

    /// Update conversion rate (admin only)
    pub fn update_conversion_rate(
        ctx: Context<UpdateConversionRate>,
        new_rate: u64,
    ) -> Result<()> {
        require!(new_rate > 0, ErrorCode::InvalidConversionRate);
        
        let state = &mut ctx.accounts.global_state;
        state.conversion_rate = new_rate;
        
        msg!("Conversion rate updated to: {}", new_rate);
        Ok(())
    }

    /// Fund the reward vault (anyone can fund)
    pub fn fund_vault(ctx: Context<FundVault>, amount: u64) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.funder.to_account_info(),
                to: ctx.accounts.reward_vault.to_account_info(),
            },
        );
        
        transfer(cpi_context, amount)?;
        
        msg!("Vault funded with {} lamports", amount);
        Ok(())
    }
}

// ============================================================================
// Account Structures
// ============================================================================

#[account]
pub struct GlobalState {
    pub admin: Pubkey,              // Admin public key
    pub conversion_rate: u64,       // Points per SOL (e.g., 1000 = 1000 points per SOL)
    pub total_points_distributed: u64, // Total points awarded
    pub bump: u8,                   // PDA bump seed
}

#[account]
pub struct UserAccount {
    pub owner: Pubkey,              // User's wallet
    pub user_type: UserType,        // Fan or Artist
    pub points: u64,                // Current redeemable points
    pub total_earned: u64,          // Lifetime points earned
    pub total_redeemed: u64,        // Lifetime points redeemed
    pub bump: u8,                   // PDA bump seed
}

// ============================================================================
// Context Structures
// ============================================================================

#[derive(Accounts)]
pub struct InitializeGlobalState<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + 32 + 8 + 8 + 1,
        seeds = [b"state"],
        bump
    )]
    pub global_state: Account<'info, GlobalState>,
    
    /// CHECK: Vault PDA for holding SOL rewards
    #[account(
        mut,
        seeds = [b"vault"],
        bump
    )]
    pub reward_vault: AccountInfo<'info>,
    
    #[account(mut)]
    pub admin: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 32 + 1 + 8 + 8 + 8 + 1,
        seeds = [b"user", signer.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub signer: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordActivity<'info> {
    #[account(
        mut,
        seeds = [b"user", user_account.owner.as_ref()],
        bump = user_account.bump,
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(
        mut,
        seeds = [b"state"],
        bump = global_state.bump,
    )]
    pub global_state: Account<'info, GlobalState>,
    
    #[account(
        constraint = authority.key() == global_state.admin @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct RedeemPoints<'info> {
    #[account(
        mut,
        seeds = [b"user", user.key().as_ref()],
        bump = user_account.bump,
        constraint = user_account.owner == user.key() @ ErrorCode::Unauthorized
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(
        seeds = [b"state"],
        bump = global_state.bump,
    )]
    pub global_state: Account<'info, GlobalState>,
    
    /// CHECK: Vault PDA
    #[account(
        mut,
        seeds = [b"vault"],
        bump = global_state.bump,
    )]
    pub reward_vault: AccountInfo<'info>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateConversionRate<'info> {
    #[account(
        mut,
        seeds = [b"state"],
        bump = global_state.bump,
        constraint = global_state.admin == admin.key() @ ErrorCode::Unauthorized
    )]
    pub global_state: Account<'info, GlobalState>,
    
    pub admin: Signer<'info>,
}

#[derive(Accounts)]
pub struct FundVault<'info> {
    #[account(
        seeds = [b"state"],
        bump = global_state.bump,
    )]
    pub global_state: Account<'info, GlobalState>,
    
    /// CHECK: Vault PDA
    #[account(
        mut,
        seeds = [b"vault"],
        bump = global_state.bump,
    )]
    pub reward_vault: AccountInfo<'info>,
    
    #[account(mut)]
    pub funder: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

// ============================================================================
// Enums
// ============================================================================

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq)]
pub enum UserType {
    Fan,
    Artist,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug)]
pub enum ActivityType {
    Stream,           // +1 point
    Upload,           // +10 points
    Milestone100,     // +50 points
    Like,             // +0.5 points (represented as 1 in contract, adjust in backend)
    Share,            // +1 point
}

// ============================================================================
// Errors
// ============================================================================

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized access")]
    Unauthorized,
    
    #[msg("Insufficient points for redemption (minimum 1000 required)")]
    InsufficientPoints,
    
    #[msg("Invalid points value")]
    InvalidPoints,
    
    #[msg("Insufficient vault balance")]
    InsufficientVaultBalance,
    
    #[msg("Invalid conversion rate")]
    InvalidConversionRate,
    
    #[msg("Invalid amount")]
    InvalidAmount,
    
    #[msg("Arithmetic overflow")]
    Overflow,
}