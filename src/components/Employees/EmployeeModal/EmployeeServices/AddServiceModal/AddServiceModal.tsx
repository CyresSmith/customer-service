import { ButtonBox } from 'components/Services/ServiceModal/ServiceModal.styled';
import Button from 'components/Ui/Buttons/Button';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useAddEmployeeServiceMutation } from 'services/employee.api';
import { AddServiceModalBox } from '../EmployeeServices.styled';

type Props = {
    employeeServices?: number[];
    isOpen: boolean;
    handleModalClose: () => void;
    employeeId: number;
    openCreateServiceModal: () => void;
};

const AddServiceModal = ({
    isOpen,
    handleModalClose,
    employeeServices,
    employeeId,
    openCreateServiceModal,
}: Props) => {
    const isAdmin = useAdminRights();
    const { id: companyId, services } = useCompany();
    const [newServices, setNewServices] = useState<number[]>(employeeServices || []);

    const [addServices, { isLoading }] = useAddEmployeeServiceMutation();

    const editingAllowed = isAdmin;
    const servicesChanged =
        employeeServices?.length !== newServices.length ||
        newServices.some(item => !employeeServices.includes(item));

    const handleServiceAdd = (_: unknown, selected?: number[]) => {
        selected && setNewServices(selected);
    };

    const handleSave = async () => {
        const { message } = await addServices({
            companyId,
            employeeId,
            data: { services: newServices },
        }).unwrap();

        if (message) {
            toast.success(message);
        }
    };

    return (
        <>
            <Modal
                id="AddEmployeeServiceModal"
                $isOpen={isOpen}
                closeModal={handleModalClose}
                title="Обрати послуги"
            >
                <AddServiceModalBox>
                    <ItemsList
                        items={services.map(
                            ({ id = '', avatar = '', name = '', category, type = '' }) => ({
                                id,
                                avatar,
                                name,
                                category: category?.name || '',
                                type: type === 'individual' ? 'Індівідуальна' : 'Групова',
                            })
                        )}
                        keyForSelect="category"
                        onItemClick={handleServiceAdd}
                        addButtonTitle={editingAllowed ? 'Створити послугу' : undefined}
                        onAddClick={openCreateServiceModal}
                        selection={newServices}
                    />
                </AddServiceModalBox>

                <ButtonBox>
                    <Button
                        disabled={!servicesChanged}
                        onClick={handleSave}
                        $colors="accent"
                        Icon={IoIosSave}
                        isLoading={isLoading}
                    >
                        Зберегти
                    </Button>
                </ButtonBox>
            </Modal>
        </>
    );
};

export default AddServiceModal;
