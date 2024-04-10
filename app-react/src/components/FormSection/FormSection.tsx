import React, { useEffect, useState } from 'react';
import { ITransactionFormData, IFormSectionProps } from '../../types/interfaces';

/**
 * This component displays the form to submit a new transaction.
 * It has two input fields for account ID and amount.
 * It also has a submit button to submit the form.
 * It also displays a success message if the transaction is created successfully.
 */
const FormSection: React.FC<IFormSectionProps> = ({ onSubmit }) => {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // for the toast message
    let timer: NodeJS.Timeout;
    if (success) {
      setShowSuccess(true);
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validating the form fields
    if (!accountId || !amount) {
      setError('Please fill in all fields.');
      return;
    }
    // account id should be a uuid
    // regex source: https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
    if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(accountId)) {
      setError('Account ID should be a valid UUID.');
      return;
    }
    // amount should be a valid number, not NaN or string
    if (isNaN(parseFloat(amount))) {
      setError('Amount should be a valid number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData: ITransactionFormData = { accountId, amount: parseFloat(amount) };
      // call the function passed as props to handle the submission
      // the props setup is used because, the transaction history can be updated after the submission
      await onSubmit(formData);
      setSuccess('Transaction created successfully!');

      // resetting form fields
      setAccountId('');
      setAmount('');
    } catch (error) {
      // handle errors from API
      setError('Failed to create transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/5 pr-4 border-r border-gray-300">
      <div className="border border-gray-300 rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Submit new transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="account_id" className="block mb-1">Account ID:</label>
            <input
              type="text"
              id="account_id"
              name="account_id"
              value={accountId}
              data-type='account-id'
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-1">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              data-type='amount'
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              data-type='transaction-submit'
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
      {showSuccess && (
        <div className="fixed bottom-0 right-0 m-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {success}
        </div>
      )}
    </div>
  );
};

export default FormSection;
