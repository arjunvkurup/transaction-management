import axios from 'axios';
import { ITransactionApiType, ITransactionFormData } from '../types/interfaces';

// backend base URL
const baseURL = 'http://127.0.0.1:3000/api/v1';

// create an axios instance
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
* This function fetches transactions from the API and adds the account balance to each transaction.
*/
export const fetchTransactions = async () => {
    try {
        const transactionResponse = await api.get('/transactions/');
        const transactions = transactionResponse.data;
        const transactionWithBalance = await Promise.all(
            transactions.map(async (transaction: ITransactionApiType) => {
                const accountResponse = await api.get(`/accounts/${transaction.account_id}`);
                const account = accountResponse.data;
                return { ...transaction, balance: account.balance };
            })
        );
        return transactionWithBalance;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

/**
 * This function creates a new transaction using the API.
 * @param transactionData - The transaction data to be created.
 */
export const createTransaction = async (transactionData: ITransactionFormData) => {
    try {
        const requestData = {
            account_id: transactionData.accountId,
            amount: transactionData.amount,
        }
        const response = await api.post('/transactions', requestData);
        return response.data;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

export const checkHealth = async () => {
    /**
     * This function checks the health of the backend API.
     */
    try {
        const response = await api.get('/ping');
        return response.data;
    } catch (error) {
        console.error('Error checking health:', error);
        throw error;
    }
}
