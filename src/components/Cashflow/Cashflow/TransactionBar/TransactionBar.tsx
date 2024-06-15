import Button from 'components/Ui/Buttons/Button';
import { useState } from 'react';
import { HiMinus, HiPencilAlt, HiPlus, HiRefresh } from 'react-icons/hi';

import { useCompany } from 'hooks/useCompany';
import { useGetCashboxesQuery } from 'services/cashbox.api';
import IncomeModal from './IncomeModal/IncomeModal';
import { LeftSide, RightSide, TransactionBarBox } from './TransactionBar.styled';

type Props = {};

enum OpenModal {
    INCOME = 'income',
    EXPENSE = 'expense',
    MOVING = 'moving',
    CHANGE = 'change',
}

const TransactionBar = (props: Props) => {
    const { id: companyId } = useCompany();

    const {
        data: cashboxes,
        isLoading: isCashboxesLoading,
        refetch,
    } = useGetCashboxesQuery({ companyId }, { skip: !companyId });

    const isCashboxes = cashboxes && cashboxes.length > 0;

    const [modalOpen, setModalOpen] = useState<OpenModal | null>(null);

    const handleModalOpen = (id: OpenModal) => setModalOpen(id);
    const handleModalClose = () => setModalOpen(null);

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

            {modalOpen && isCashboxes && (
                <>
                    {modalOpen === OpenModal.INCOME && (
                        <IncomeModal
                            isModalOpen={Boolean(modalOpen)}
                            handleModalClose={handleModalClose}
                            cashboxes={cashboxes}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default TransactionBar;
