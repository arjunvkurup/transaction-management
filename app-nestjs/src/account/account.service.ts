import { Injectable } from '@nestjs/common';
import { Account } from './account.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AccountService {
  private account: Account[] = [];

  /**
   * create a new account with the provided account_id and amount.
   * add the account to the account array and returns the created account.
   *
   * @param account_id UUID of the new account
   * @param amount initial amount for the new account
   * @returns created account object
   */
  createAccount(account_id: uuid, amount: number): Account {
    const account = new Account(account_id, amount);
    this.account.push(account);
    return account;
  }

  /**
   * retrieves an account by its account_id.
   * returns null if the account is not found.
   *
   * @param account_id UUID of the account to retrieve
   * @returns retrieved account or null if not found
   */
  getAccountById(account_id: uuid): Account {
    const account = this.account.find(
      (account) => account.account_id === account_id,
    );
    if (!account) {
      return null;
    }
    return account;
  }

  /**
   * updates an account with the provided account data.
   * throws an error if the account is not found.
   *
   * @param updatedAccount account data to update
   * @returns the updated account
   */
  updateAccount(updatedAccount: Account): Account {
    const accountIndex = this.account.findIndex(
      (account) => account.account_id === updatedAccount.account_id,
    );
    if (accountIndex === -1) {
      throw new Error('Account not found');
    }
    this.account[accountIndex] = updatedAccount;
    return updatedAccount;
  }
}
