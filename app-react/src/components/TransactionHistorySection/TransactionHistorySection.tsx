import React from 'react';
import { ITransactionHistorySectionProps } from '../../types/interfaces';

 /**
   * This component displays the transaction history.
   * It receives the transactions as props and maps through them to display each transaction.
   * Each transaction is displayed in a div with the amount and the account ID.
   */
const TransactionHistorySection: React.FC<ITransactionHistorySectionProps> = ({ transactions }) => {
  return (
    <div className="w-4/5 pl-4">
      <div className="flex flex-col border border-gray-300 rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Transaction history</h2>
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded p-4 mb-4"
            data-type="transaction"
            data-account-id={transaction.account_id}
            data-amount={transaction.amount}
            data-balance={transaction.balance}
          >
            <p className="mb-1">
              {transaction.amount < 0 ? 
                `Transferred ${Math.abs(transaction.amount)}$ from account ${transaction.account_id}` :
                `Transferred ${transaction.amount}$ to account ${transaction.account_id}`
              }
            </p>
            <p className="mb-1">The current account balance is {transaction.balance}$</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistorySection;