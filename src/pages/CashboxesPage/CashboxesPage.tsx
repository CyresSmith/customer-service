import CashboxDetails from 'components/Cashboxes/CashboxDetails';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import CustomForm from 'components/Ui/Form/CustomForm';
import { InputProps, SelectItem } from 'components/Ui/Form/types';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { format } from 'date-fns';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import {
    useAddCashboxMutation,
    useGetCashboxesQuery,
    useRemoveCashboxMutation,
} from 'services/cashbox.api';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { ModalFormBox } from './CashboxesPage.styled';

const inputs: InputProps[] = [
    { name: 'name', type: 'text', value: '' },
    { name: 'balance', type: 'text', value: '' },
    { name: 'responsible', type: 'select', value: false },
    { name: 'comment', type: 'textarea', value: false },
];

enum OpenModal {
    ADD = 1,
    CONFIRM = 2,
    DETAILS = 3,
}

const CashboxesPage = () => {
    const { id: companyId } = useCompany();

    const initialState: { name: string; balance: number; responsible: boolean | SelectItem } = {
        name: '',
        balance: 0,
        responsible: false,
    };

    const [modalOpen, setModalOpen] = useState<OpenModal | null>(null);
    const [selectedCashboxId, setSelectedCashboxId] = useState<number | null>(null);

    const { data: employees } = useGetCompanyEmployeesQuery(companyId);
    const { data: cashboxes } = useGetCashboxesQuery({ companyId });
    const [removeCashbox, { isLoading: isRemoveLoading }] = useRemoveCashboxMutation();
    const [addCashbox, { isLoading }] = useAddCashboxMutation();

    const handleModalClose = () => {
        setModalOpen(null);
        setSelectedCashboxId(null);
    };

    const handleCashboxAdd = async (state: typeof initialState) => {
        if (state.responsible && typeof state.responsible !== 'boolean' && state.responsible.id) {
            const data = { ...state, balance: +state.balance, responsible: +state.responsible?.id };

            const resp = await addCashbox({ data, companyId }).unwrap();

            if (resp) {
                handleModalClose();
                toast.success('Касу додано');
            }
        }
    };

    const confirmRemove = (id: number) => {
        setSelectedCashboxId(id);
        setModalOpen(OpenModal.CONFIRM);
    };

    const handleCashboxRemove = async () => {
        if (!selectedCashboxId) return;

        const { message } = await removeCashbox({ companyId, id: selectedCashboxId }).unwrap();

        if (message) {
            handleModalClose();
            setSelectedCashboxId(null);
            toast.success(message);
        }
    };

    const handleCashboxClick = (id: number) => {
        setSelectedCashboxId(id);
        setModalOpen(OpenModal.DETAILS);
    };

    const selectedCashbox = cashboxes?.find(({ id }) => id === selectedCashboxId);

    const employeesForSelect =
        employees?.map(({ id, firstName, lastName }) => ({
            id,
            value: firstName + ' ' + lastName,
        })) || [];

    return (
        <>
            <ItemsList
                items={
                    cashboxes?.map(
                        ({ id, name, balance, isActive, responsible, createdAt, updatedAt }) => ({
                            id,
                            name,
                            balance: balance + '.00 грн',
                            responsible: responsible.firstName + ' ' + responsible.lastName,
                            createdAt: format(createdAt, 'PPpp'),
                            isActive,
                        })
                    ) || []
                }
                keyForSelect="responsible"
                onItemClick={handleCashboxClick}
                onAddClick={() => setModalOpen(OpenModal.ADD)}
                onItemDeleteClick={confirmRemove}
                addButtonTitle="Створити касу"
                isDeleteLoading={isRemoveLoading}
            />

            {modalOpen === OpenModal.ADD && employees && (
                <Modal
                    $w="400px"
                    id="addCashbox"
                    closeModal={handleModalClose}
                    $isOpen={modalOpen === OpenModal.ADD}
                    title="Створення каси"
                >
                    <ModalFormBox>
                        <CustomForm
                            inputs={inputs}
                            buttonLabel="Створити"
                            onSubmit={handleCashboxAdd}
                            initialState={initialState}
                            isLoading={isLoading}
                            SubmitButtonIcon={HiCloudUpload}
                            visibleSelectItems={3}
                            selectItems={employeesForSelect}
                        />
                    </ModalFormBox>
                </Modal>
            )}

            {modalOpen === OpenModal.DETAILS && employees && selectedCashboxId && (
                <Modal
                    id="cashboxDetails"
                    $w="400px"
                    closeModal={handleModalClose}
                    $isOpen={modalOpen === OpenModal.DETAILS}
                    title={selectedCashbox?.name}
                >
                    <ModalFormBox>
                        <CashboxDetails
                            id={selectedCashboxId}
                            employees={employeesForSelect}
                            handleModalClose={handleModalClose}
                        />
                    </ModalFormBox>
                </Modal>
            )}

            {modalOpen === OpenModal.CONFIRM && (
                <ConfirmOperation
                    id="confirmCashboxRemove"
                    closeConfirm={handleModalClose}
                    isOpen={modalOpen === OpenModal.CONFIRM}
                    callback={handleCashboxRemove}
                    children={`Ви дійсно бажаєте видалити касу "${selectedCashbox?.name}"`}
                />
            )}
        </>
    );
};

export default CashboxesPage;
