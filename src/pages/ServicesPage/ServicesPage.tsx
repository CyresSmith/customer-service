import ServiceModal from 'components/Services/ServiceModal';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import { ServiceOpenModal } from 'helpers/enums';
import { useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteServiceMutation, useGetServicesQuery } from 'services/service.api';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';

const ServicesPage = () => {
    const { id: companyId } = useCompany();

    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);
    const isTablet = useMediaQuery(theme.breakpoints.tablet.media);
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);
    const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);
    const [serviceId, setServiceId] = useState<number | undefined>(undefined);
    const isAdmin = useAdminRights();

    const { data: services, isLoading: servicesLoading } = useGetServicesQuery(
        { companyId },
        { skip: !companyId }
    );

    const [deleteService, { isLoading: isServiceDeleteLoading }] = useDeleteServiceMutation();

    const handleModalOpen = (type: ServiceOpenModal | null, serviceId?: number) => {
        serviceId && setServiceId(serviceId);
        setOpenModal(type);
    };

    const handleModalClose = () => {
        setServiceId(undefined);
        setOpenModal(null);
    };

    const handleServiceDelete = async () => {
        if (!serviceId) return;

        const { message } = await deleteService({ companyId, serviceId }).unwrap();

        if (message) {
            handleModalClose();
            toast.success('Послугу видалено');
        }
    };

    const items =
        services?.map(({ id, avatar, name, category, type, duration, price }) => {
            let service = {
                id,
                avatar,
                name,
            };

            if (isDesktop) {
                service = Object.assign(service, {
                    category: category.name,
                    type: type === 'individual' ? 'Індівідуальна' : 'Групова',
                    duration,
                });
            }

            if (isTablet || isDesktop) {
                service = Object.assign(service, {
                    category: category.name,
                    price,
                });
            }

            return service;
        }) || [];

    return servicesLoading ? (
        <Loader />
    ) : services ? (
        <>
            <ItemsList
                items={items}
                keyForSelect={!isMobile ? 'category' : undefined}
                onItemClick={id => handleModalOpen(ServiceOpenModal.EDIT_SERVICE, +id)}
                addButtonTitle="Додати послугу"
                onAddClick={isAdmin ? () => handleModalOpen(ServiceOpenModal.ADD) : undefined}
                onItemDeleteClick={
                    isAdmin
                        ? id => handleModalOpen(ServiceOpenModal.DELETE_SERVICE, +id)
                        : undefined
                }
                isDeleteLoading={isServiceDeleteLoading}
            />

            {openModal && (
                <>
                    {openModal !== ServiceOpenModal.DELETE_SERVICE && (
                        <ServiceModal
                            openModal={openModal}
                            serviceId={serviceId}
                            handleModalClose={handleModalClose}
                        />
                    )}

                    {openModal === ServiceOpenModal.DELETE_SERVICE && serviceId && (
                        <ConfirmOperation
                            id="confirmServiceDelete"
                            callback={handleServiceDelete}
                            closeConfirm={handleModalClose}
                            isOpen={openModal === ServiceOpenModal.DELETE_SERVICE}
                        >
                            Ви дійсно бажаєте видалити сервіс "
                            {services.find(({ id }) => id === serviceId)?.name}" ?
                        </ConfirmOperation>
                    )}
                </>
            )}
        </>
    ) : null;
};

export default ServicesPage;
