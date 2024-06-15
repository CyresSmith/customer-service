import { Company } from 'store/company/company.types';
import { CashboxBasicInfo } from './cashbox.types';
import { ClientBasicInfo } from './clients.types';
import { EmployeeBasicInfo } from './employee.types';
import { EventType } from './event.types';

export type AddTransactionCategoryDto = {
    name: string;
};

export type AddTransactionDto = {
    amount: number;
};

export type TransactionType = 'income' | 'expense' | 'moving' | 'change';

export type TransactionCategoryBasicInfo = {
    id: number;
    name: string;
    type: TransactionType;
};

export type Transaction = {
    id: number;
    year: number;
    month: number;
    day: number;
    time: number;
    amount: number;
    company: Company;
    cashbox: CashboxBasicInfo;
    fromCashboxId: CashboxBasicInfo;
    client: ClientBasicInfo;
    employee: EmployeeBasicInfo;
    creator: EmployeeBasicInfo;
    event: EventType;
    type: TransactionType;
    category: TransactionCategoryBasicInfo;
    comments: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateTransactionDto = Pick<
    Transaction,
    'year' | 'month' | 'day' | 'time' | 'amount'
> & {
    cashbox: number;
    creator: number;
};

export type addServiceTransactionDto = CreateTransactionDto & {
    client: number;
    events?: number[];
    services?: number[];
    employees: number[];
    comments?: string;
};

export type addSellTransactionDto = CreateTransactionDto & {
    client?: number;
    comments: string;
};

export type addMovingTransactionDto = CreateTransactionDto & {
    toCashboxId: number;
    comments: string;
};

export type addPurchaseTransactionDto = CreateTransactionDto & {
    comments: string;
};

export type addSalaryTransactionDto = CreateTransactionDto & {
    employee: number;
    comments: string;
};

export type addChangeBalanceDto = Omit<CreateTransactionDto, 'amount'> & {
    balance: number;
    comments: string;
};

export type TransactionBasicInfo = Pick<Transaction, 'id' | 'amount' | 'type'>;

export type TransactionTimeParams = Pick<Transaction, 'year' | 'month' | 'day'> & {
    time?: number;
};

export type GetTransactionsParams = { companyId: number } & Partial<TransactionTimeParams>;

export type GetTransactionsPeriodParams = { companyId: number } & {
    yearFrom: number;
    monthFrom: number;
    dayFrom: number;
    timeFrom?: string;
    yearTo: number;
    monthTo: number;
    dayTo: number;
    timeTo?: string;
};

export type TransactionModalProps = {
    isModalOpen: boolean;
    handleModalClose: () => void;
    cashboxes: CashboxBasicInfo[];
    creator: number;
};
