import { v4 as uuidv4 } from 'uuid';

export class Account {
  readonly account_id: uuidv4;
  balance: number;
  readonly createdAt: Date;

  constructor(account_id: uuidv4, amount: number) {
    this.account_id = account_id;
    this.balance = amount;
    this.createdAt = new Date();
  }
}
