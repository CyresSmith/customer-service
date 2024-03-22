import ServiceModal from 'components/Services/ServiceModal';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import { ServiceOpenModal } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { useGetServicesCategoriesQuery } from 'services/company.api';

const ServicesPage = () => {
  const { id, services } = useCompany();
  const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);
  const [serviceId, setServiceId] = useState<number | undefined>(undefined);

  const {
    isLoading: categoriesLoading,
    data: categories,
    refetch: refetchCategories,
  } = useGetServicesCategoriesQuery({ id }, { skip: !id });

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

  return categoriesLoading ? (
    <Loader />
  ) : (
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

      {openModal && categories && (
        <ServiceModal
          categories={categories}
          openModal={openModal}
          serviceId={serviceId}
          handleModalClose={handleModalClose}
          refetchCategories={() => refetchCategories()}
        />
      )}
    </>
  );
};

export default ServicesPage;
