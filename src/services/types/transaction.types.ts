export type AddTransactionCategoryDto = {
    name: string;
};

export type AddTransactionDto = {
    amount: number;
};

export type TransactionCategoryBasicInfo = {
    id: number;
    name: string;
};

export type TransactionBasicInfo = {
    id: number;
    amount: number;
};
