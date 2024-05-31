import { ButtonBox } from 'components/Services/ServiceModal/ServiceModal.styled';
import Button from 'components/Ui/Buttons/Button';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import { useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useAddEmployeeServiceMutation } from 'services/employee.api';
import { useGetServicesQuery } from 'services/service.api';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
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
    const isTablet = useMediaQuery(theme.breakpoints.tablet.media);
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);
    const { id: companyId } = useCompany();
    const [newServices, setNewServices] = useState<number[]>(employeeServices || []);

    const [addServices, { isLoading }] = useAddEmployeeServiceMutation();

    const { data: services, isLoading: isServicesLoading } = useGetServicesQuery(
        {
            companyId,
        },
        { skip: !companyId }
    );

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

    const items =
        services?.map(({ id = 0, avatar = '', name = '', category, type = '' }) => {
            let service = {
                id,
                avatar,
                name,
            };

            if (isTablet || isDesktop) {
                service = Object.assign(service, {
                    category: category?.name || '',
                    type: type === 'individual' ? 'Індівідуальна' : 'Групова',
                });
            }

            return service;
        }) || [];

    return (
        <>
            <Modal
                id="AddEmployeeServiceModal"
                $isOpen={isOpen}
                closeModal={handleModalClose}
                title="Обрати послуги"
            >
                {isServicesLoading ? (
                    <Loader />
                ) : (
                    <>
                        {services && (
                            <AddServiceModalBox>
                                <ItemsList
                                    items={items}
                                    keyForSelect={isTablet || isDesktop ? 'category' : undefined}
                                    onItemClick={handleServiceAdd}
                                    addButtonTitle={isDesktop ? 'Створити послугу' : undefined}
                                    onAddClick={editingAllowed ? openCreateServiceModal : undefined}
                                    selection={newServices}
                                />
                            </AddServiceModalBox>
                        )}

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
                    </>
                )}
            </Modal>
        </>
    );
};

export default AddServiceModal;
