import ServiceModal from 'components/Services/ServiceModal';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import { SelectItem } from 'components/Ui/Form/types';
import ItemsList from 'components/Ui/ItemsList';
import { hoursToMilliseconds, millisecondsToHours, millisecondsToMinutes } from 'date-fns';
import { ServiceOpenModal } from 'helpers/enums';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useGetServicesCategoriesQuery } from 'services/categories.api';
import { useRemoveEmployeeServiceMutation } from 'services/employee.api';
import { EmployeeStatusEnum, IEmployee } from 'services/types/employee.types';
import { EmployeesServiceSettings } from 'services/types/service.type';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import AddServiceModal from './AddServiceModal/AddServiceModal';
import EditEmployeeServiceModal from './EditEmployeeServiceModal/EditEmployeeServiceModal';
import { EmployeeServicesBox } from './EmployeeServices.styled';

type Props = {
    employee: IEmployee;
};

type ServiceState = {
    durationHours: SelectItem;
    durationMinutes: SelectItem;
    price: number;
};

const EmployeeServices = ({ employee }: Props) => {
    const isTablet = useMediaQuery(theme.breakpoints.tablet.media);
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);
    const isAdmin = useAdminRights();
    const { user } = useAuth();
    const { id: companyId } = useCompany();
    const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);
    const [service, setService] = useState<{
        id: number;
        employeeId: number;
        name: string;
        avatar: string;
        employeesSettings: EmployeesServiceSettings[];
        state: ServiceState;
    } | null>(null);

    const [serviceId, setServiceId] = useState<number | null>(null);

    const [removeEmployeeService, { isLoading: isEmployeeServiceRemoveLoading }] =
        useRemoveEmployeeServiceMutation();

    const { data: categories } = useGetServicesCategoriesQuery({ companyId }, { skip: !companyId });

    const editingAllowed = isAdmin || user?.id === +employee.user.id;

    const handleDelete = (id: number) => {
        setServiceId(id);
        setOpenModal(ServiceOpenModal.DELETE_SERVICE);
    };

    const handleModalOpen = (type: ServiceOpenModal | null, serviceId?: number) => {
        if (type === ServiceOpenModal.ADD_TO_EMPLOYEE) return setOpenModal(type);

        if (!serviceId) return;

        const service = employee.services.find(({ id }) => id === serviceId);

        if (service) {
            const employeeSetting = service.employeesSettings?.find(
                setting => setting.employeeId === +employee.id
            );

            const hours =
                employeeSetting && employeeSetting.duration
                    ? millisecondsToHours(employeeSetting.duration)
                    : service?.duration
                    ? millisecondsToHours(service?.duration)
                    : 0;

            const minutes =
                employeeSetting && employeeSetting.duration
                    ? millisecondsToMinutes(employeeSetting?.duration - hoursToMilliseconds(hours))
                    : service?.duration
                    ? millisecondsToMinutes(service?.duration - hoursToMilliseconds(hours))
                    : 0;

            const serviceState = {
                durationHours: { id: hours, value: `${hours} г.` },
                durationMinutes: { id: minutes, value: `${minutes} хв.` },
                price: employeeSetting?.price || service.price || 0,
            };

            setService({
                id: service.id,
                employeeId: +employee.id,
                name: service.name,
                employeesSettings: service.employeesSettings,
                avatar: service.avatar,
                state: serviceState,
            });

            setOpenModal(type);
        }
    };

    const handleModalClose = () => {
        setService(null);
        setServiceId(null);
        setOpenModal(null);
    };

    const handleRemoveEmployeeService = async () => {
        if (serviceId) {
            const { message } = await removeEmployeeService({
                companyId,
                employeeId: employee.id,
                serviceId,
            }).unwrap();

            if (message) {
                handleModalClose();
                toast.success(message);
            }
        }
    };

    const handleOpenCreateServiceModal = () => setOpenModal(ServiceOpenModal.ADD);

    const items = employee.services.map(
        ({
            id = 0,
            avatar = '',
            name = '',
            category,
            type = '',
            duration = 0,
            price = 0,
            employeesSettings,
        }) => {
            let service = {
                id,
                avatar,
                name,
            };

            if (isDesktop) {
                service = Object.assign(service, {
                    category: category?.name || '',
                    type: type === 'individual' ? 'Індівідуальна' : 'Групова',
                });
            }

            if (isTablet || isDesktop) {
                service = Object.assign(service, {
                    duration:
                        (employeesSettings &&
                            employeesSettings.length > 0 &&
                            employeesSettings.find(setting => setting.employeeId === +employee.id)
                                ?.duration) ||
                        duration,
                    price:
                        (employeesSettings &&
                            employeesSettings.length > 0 &&
                            employeesSettings.find(setting => setting.employeeId === +employee.id)
                                ?.price) ||
                        price,
                });
            }

            return service;
        }
    );

    const keyForSelect = isDesktop ? 'category' : undefined;

    return (
        <EmployeeServicesBox>
            <ItemsList
                items={items}
                keyForSelect={keyForSelect as 'name' | undefined}
                onItemClick={
                    editingAllowed
                        ? id => handleModalOpen(ServiceOpenModal.EDIT_SERVICE, +id)
                        : undefined
                }
                addButtonTitle={
                    editingAllowed &&
                    employee.provider &&
                    employee.status !== EmployeeStatusEnum.FIRED
                        ? 'Додати послуги'
                        : undefined
                }
                onAddClick={
                    editingAllowed &&
                    employee.provider &&
                    employee.status !== EmployeeStatusEnum.FIRED
                        ? () => handleModalOpen(ServiceOpenModal.ADD_TO_EMPLOYEE)
                        : undefined
                }
                onItemDeleteClick={editingAllowed ? handleDelete : undefined}
            />

            {openModal === ServiceOpenModal.ADD_TO_EMPLOYEE && (
                <AddServiceModal
                    isOpen={openModal === ServiceOpenModal.ADD_TO_EMPLOYEE}
                    handleModalClose={handleModalClose}
                    employeeServices={employee.services.map(({ id }) => +id)}
                    employeeId={employee.id}
                    openCreateServiceModal={handleOpenCreateServiceModal}
                />
            )}

            {openModal === ServiceOpenModal.ADD && categories && (
                <ServiceModal openModal={openModal} handleModalClose={handleModalClose} />
            )}

            {openModal === ServiceOpenModal.EDIT_SERVICE && service && (
                <EditEmployeeServiceModal
                    openModal={openModal === ServiceOpenModal.EDIT_SERVICE}
                    handleModalClose={handleModalClose}
                    service={service}
                />
            )}

            {openModal === ServiceOpenModal.DELETE_SERVICE && serviceId && (
                <ConfirmOperation
                    id="removeEmployeeService"
                    isOpen={openModal === ServiceOpenModal.DELETE_SERVICE}
                    closeConfirm={handleModalClose}
                    callback={handleRemoveEmployeeService}
                    isLoading={isEmployeeServiceRemoveLoading}
                >
                    Дійсно бажаєте відалити сервіс "
                    {employee.services.find(({ id }) => +id === +serviceId)?.name}",
                </ConfirmOperation>
            )}
        </EmployeeServicesBox>
    );
};

export default EmployeeServices;
