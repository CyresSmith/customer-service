import CustomForm from 'components/Ui/Form/CustomForm';
import { InputProps } from 'components/Ui/Form/types';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { useAddCashboxMutation, useGetCashboxesQuery } from 'services/cashbox.api';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';

const inputs: InputProps[] = [
    { name: 'name', type: 'text', value: '' },
    { name: 'balance', type: 'text', value: '' },
    { name: 'responsible', type: 'select', value: '' },
];

enum OpenModal {
    ADD = 1,
}

const CashboxesPage = () => {
    const { id: companyId } = useCompany();

    const initialState = { name: '', balance: 0, responsible: '' };

    const [modalOpen, setModalOpen] = useState<OpenModal | null>(null);

    const { data: employees } = useGetCompanyEmployeesQuery(companyId);
    const { data: checkboxes } = useGetCashboxesQuery({ companyId });
    const [addCashbox, { isLoading }] = useAddCashboxMutation();

    const handleCashboxAdd = () => {};

    const handleModalClose = () => setModalOpen(null);

    return (
        <>
            <ItemsList
                items={
                    checkboxes?.map(({ id, name, balance, isActive, responsible }) => ({
                        id,
                        name,
                        balance,
                        isActive,
                        responsible: responsible.fullName,
                    })) || []
                }
                onAddClick={() => setModalOpen(OpenModal.ADD)}
            />

            {modalOpen === OpenModal.ADD && (
                <Modal closeModal={handleModalClose}>
                    <CustomForm
                        inputs={inputs}
                        buttonLabel="Створити"
                        onSubmit={handleCashboxAdd}
                        initialState={initialState}
                        isLoading={isLoading}
                        SubmitButtonIcon={HiCloudUpload}
                        selectItems={employees.map(() => {})}
                    />
                </Modal>
            )}
        </>
    );
};

export default CashboxesPage;
