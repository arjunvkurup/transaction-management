import { v4 as uuidv4 } from 'uuid';

/**
 * Transaction model, schema for the transaction object
 */
export class Transaction {
  readonly transaction_id: uuidv4;
  readonly account_id: uuidv4;
  readonly amount: number;
  readonly created_at: Date;

  constructor(accountId: uuidv4, amount: number) {
    this.transaction_id = uuidv4();
    this.account_id = accountId;
    this.amount = amount;
    this.created_at = new Date();
  }
}
