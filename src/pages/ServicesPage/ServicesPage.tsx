import ServiceModal from 'components/Services/ServiceModal';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import { ServiceOpenModal } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from 'services/service.api';

const ServicesPage = () => {
  const { id: companyId } = useCompany();
  const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);
  const [serviceId, setServiceId] = useState<number | undefined>(undefined);

  const { data: services, isLoading: servicesLoading } = useGetServicesQuery(
    { companyId },
    { skip: !companyId }
  );

  const [deleteService, { isLoading: isServiceDeleteLoading }] =
    useDeleteServiceMutation();

  const handleModalOpen = (
    type: ServiceOpenModal | null,
    serviceId?: number
  ) => {
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

  return servicesLoading ? (
    <Loader />
  ) : services ? (
    <>
      <ItemsList
        items={services.map(
          ({ id, avatar, name, category, type, duration, price }) => ({
            id,
            avatar,
            name,
            category: category.name,
            type: type === 'individual' ? 'Індівідуальна' : 'Групова',
            duration,
            price,
          })
        )}
        keyForSelect="category"
        onItemClick={id => handleModalOpen(ServiceOpenModal.EDIT_SERVICE, +id)}
        addButtonTitle="Додати послугу"
        onAddClick={() => handleModalOpen(ServiceOpenModal.ADD)}
        onItemDeleteClick={id =>
          handleModalOpen(ServiceOpenModal.DELETE_SERVICE, +id)
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
