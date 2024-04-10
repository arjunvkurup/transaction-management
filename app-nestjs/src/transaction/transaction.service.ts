import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Transaction } from './transaction.model';
import { AccountService } from '../account/account.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService,
  ) { }

  private transactions: Transaction[] = [];

  /**
   * Create a new transaction
   * @param account_id The ID of the account, type uuid
   * @param amount The amount of the transaction, type amount
   */
  async createTransaction(
    account_id: uuid,
    amount: number,
  ): Promise<Transaction> {
    try {
      let account = await this.accountService.getAccountById(account_id);
      if (!account) {
        account = await this.accountService.createAccount(account_id, amount);
      } else {
        if (amount < 0 && account.balance < Math.abs(amount)) {
          throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
        }
        // update the account balance
        account.balance += amount;
        await this.accountService.updateAccount(account);
      }
      const transaction = new Transaction(account_id, amount);
      this.transactions.push(transaction);
      return transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Return all transactions
   */
  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  /**
   * Find the transaction by its ID
   *
   * @param transaction_id The ID of the transaction
   */
  getTransactionById(transaction_id: string): Transaction {
    const transaction = this.transactions.find(
      (transaction) => transaction.transaction_id === transaction_id,
    );
    if (!transaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
    return transaction;
  }
}
