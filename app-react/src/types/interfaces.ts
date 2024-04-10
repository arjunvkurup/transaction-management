/*
    This file contains all the interfaces used in the application.
*/

export interface ITransaction {
    accountId: string;
    amount: number;
    balance: number;
}

export interface ITransactionHistorySectionProps {
    transactions: ITransactionApiType[];
}

export interface ITransactionFormData {
    accountId: string;
    amount: number;
}

export interface IFormSectionProps {
    onSubmit: (formData: ITransactionFormData) => void;
}

export interface ITransactionApiType {
    account_id: string;
    amount: number;
    balance: number;
}
