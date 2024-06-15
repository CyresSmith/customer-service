import Button from 'components/Ui/Buttons/Button';
import { useState } from 'react';
import { HiMinus, HiPencilAlt, HiPlus, HiRefresh } from 'react-icons/hi';

import { useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useGetCashboxesQuery } from 'services/cashbox.api';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import ChangeModal from './ChangeModal';
import ExpenseModal from './ExpenseModal';
import IncomeModal from './IncomeModal/IncomeModal';
import MovingModal from './MovingModal';
import { LeftSide, RightSide, TransactionBarBox } from './TransactionBar.styled';

type Props = {};

enum OpenModal {
    INCOME = 'income',
    EXPENSE = 'expense',
    MOVING = 'moving',
    CHANGE = 'change',
}

const TransactionBar = (props: Props) => {
    const { user } = useAuth();
    const { id: companyId } = useCompany();

    const { data: cashboxes = [] } = useGetCashboxesQuery({ companyId }, { skip: !companyId });
    const { data: employees = [] } = useGetCompanyEmployeesQuery(companyId, { skip: !companyId });

    const [modalOpen, setModalOpen] = useState<OpenModal | null>(null);

    const creator = employees?.find(({ userId }) => userId === user?.id)?.id;

    const handleModalOpen = (id: OpenModal) => setModalOpen(id);
    const handleModalClose = () => setModalOpen(null);

    if (!creator) return;

    const TransactionModalProps = {
        handleModalClose,
        cashboxes,
        creator,
    };

    return (
        <>
            <TransactionBarBox>
                <LeftSide>
                    <Button
                        onClick={() => handleModalOpen(OpenModal.CHANGE)}
                        $colors="accent"
                        Icon={HiPencilAlt}
                        children="Зміна залишку"
                    />
                </LeftSide>

                <RightSide>
                    <li>
                        <Button
                            onClick={() => handleModalOpen(OpenModal.INCOME)}
                            $colors="success"
                            Icon={HiPlus}
                            children="Доход"
                        />
                    </li>
                    <li>
                        <Button
                            onClick={() => handleModalOpen(OpenModal.EXPENSE)}
                            $colors="danger"
                            Icon={HiMinus}
                            children="Витрата"
                        />
                    </li>
                    {cashboxes && cashboxes.length > 1 && (
                        <li>
                            <Button
                                onClick={() => handleModalOpen(OpenModal.MOVING)}
                                $colors="accent"
                                Icon={HiRefresh}
                                children="Переміщєння"
                            />
                        </li>
                    )}
                </RightSide>
            </TransactionBarBox>

            {modalOpen && (
                <>
                    {modalOpen === OpenModal.INCOME && (
                        <IncomeModal
                            isModalOpen={Boolean(modalOpen === OpenModal.INCOME)}
                            {...TransactionModalProps}
                            employees={employees}
                        />
                    )}

                    {modalOpen === OpenModal.EXPENSE && (
                        <ExpenseModal
                            isModalOpen={modalOpen === OpenModal.EXPENSE}
                            {...TransactionModalProps}
                            employees={employees}
                        />
                    )}

                    {modalOpen === OpenModal.MOVING && (
                        <MovingModal
                            isModalOpen={modalOpen === OpenModal.MOVING}
                            {...TransactionModalProps}
                        />
                    )}

                    {modalOpen === OpenModal.CHANGE && (
                        <ChangeModal
                            isModalOpen={modalOpen === OpenModal.CHANGE}
                            {...TransactionModalProps}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default TransactionBar;
