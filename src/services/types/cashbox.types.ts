export type CreateCashboxDto = {
    name: string;
    balance: number;
    responsible: number;
};

export type CashboxBasicInfo = {
    id: number;
    name: string;
    balance: number;
    isActive: boolean;
    responsible: { id: number; fullName: string };
};
