use anchor_lang::prelude::*;

declare_id!("3gfWKGBgW5wq1PUQdNV2qipxcks1HNEAJjYgKCQKBJdy");

#[program]
pub mod myepicproject {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_characters = 0;
        Ok(())
    }

    pub fn add_character(ctx: Context<AddCharacter>, character_link: String) -> Result <()> {
      let base_account = &mut ctx.accounts.base_account;
      let user = &mut ctx.accounts.user;

      let item = ItemStruct {
        character_link: character_link.to_string(),
        user_address: *user.to_account_info().key,
        // level: 1,
        // sport: "golf",
      };
      
      base_account.character_list.push(item);
      base_account.total_characters += 1;
      Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct AddCharacter<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub character_link: String,
    pub user_address: Pubkey,
    // pub level: Integer,
    // pub sport: String
}

#[account]
pub struct BaseAccount {
    pub total_characters: u64,
    pub character_list: Vec<ItemStruct>,
}