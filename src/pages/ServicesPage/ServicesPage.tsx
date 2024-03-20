import ServiceModal from 'components/Services/ServiceModal';
import ItemsList from 'components/Ui/ItemsList';
import { ServiceOpenModal } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';

const ServicesPage = () => {
  const { services } = useCompany();
  const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);
  const [serviceId, setServiceId] = useState<number | undefined>(undefined);

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

  return (
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
      />

      {openModal && (
        <ServiceModal
          openModal={openModal}
          serviceId={serviceId}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};

export default ServicesPage;
