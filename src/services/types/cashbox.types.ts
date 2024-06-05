export type Cashbox = {
    id: number;
    name: string;
    balance: number;
    isActive: boolean;
    comment: string;
    createdAt: string;
    updatedAt: string;
    responsible: { id: number; firstName: string; lastName: string };
};

type ResponsibleDto = {
    responsible: number;
};

export type CreateCashboxDto = Pick<Cashbox, 'name' | 'balance'> & ResponsibleDto;

export type UpdateCashboxDto = Partial<Pick<Cashbox, 'name' | 'comment'> & ResponsibleDto>;

export type CashboxBasicInfo = Omit<Cashbox, 'comment'>;
