import React, { useEffect, useState } from 'react';
import './App.css';
import FormSection from './components/FormSection/FormSection';
import TransactionHistorySection from './components/TransactionHistorySection/TransactionHistorySection';
import { fetchTransactions, createTransaction } from './services/api';
import { ITransactionApiType, ITransactionFormData } from './types/interfaces';


/**
   * This is the main component of the application.
   * It contains the form section and the transaction history section.
   * It fetches the transactions from the API and passes them to the transaction history section.
   * It also handles the form submission and updates the transaction history after a successful submission.
   */
const App: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransactionApiType[]>([]);

  // fetch transactions on component mount
  useEffect(() => {
    refreshTransactionHistory();
  }, []);

  /*
    * This function fetches the transactions from the API and updates the state with the new data.
  */
  const refreshTransactionHistory = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleSubmit = async (formData: ITransactionFormData) => {
    try {
      await createTransaction(formData);
      // refresh transaction history after successful submission, essential
      refreshTransactionHistory();
    } catch (error) {
      console.error('Error creating transaction', error);
    }
  };

  return (
    <div className="flex m-5">
      <FormSection onSubmit={handleSubmit} />
      <TransactionHistorySection transactions={transactions} />
    </div>
  );
}

export default App;
