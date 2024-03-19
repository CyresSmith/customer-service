import ServiceModal from 'components/Services/ServiceModal';
import Services from 'components/Services/Services';
import ServicesBar from 'components/Services/ServicesBar';
import { SelectItem } from 'components/Ui/Form/types';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { ServiceOpenModal } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { ServiceBasicInfo } from 'services/types/service.type';

const ServicesPage = () => {
  const { services } = useCompany();

  const categories = services
    .reduce((acc: ServiceBasicInfo[], item) => {
      const idx = acc.findIndex(
        ({ category }) => category.id === item.category.id
      );

      if (idx === -1) {
        acc.push(item);
      }

      return acc;
    }, [])
    .map(({ category }) => ({ id: category.id, value: category.name }));

  const selectAll = {
    id: 'all',
    value: categories.length
      ? `Всі категорії: ${categories.length}`
      : `Всі категорії`,
  };
  const initialCategories = [selectAll];

  const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);
  const [serviceId, setServiceId] = useState<number | undefined>(undefined);
  const [filter, setFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] =
    useState<SelectItem[]>(initialCategories);

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

  const handleSelect = (item: SelectItem) => {
    if (item.id === selectAll.id) {
      setSelectedCategory([selectAll]);
    } else {
      setSelectedCategory(p => {
        const newState = p.filter(({ id }) => id !== selectAll.id);
        const itemIdx = newState.findIndex(({ id }) => id === item.id);

        return itemIdx === -1
          ? [...newState, item]
          : newState.filter(({ id }) => id !== item.id);
      });
    }
  };

  useEffect(() => {
    if (selectedCategory.length === 0) {
      setSelectedCategory(initialCategories);
    }
  }, [selectedCategory.length]);

  return (
    <>
      <PageContentLayout
        bar={
          <ServicesBar
            handleModalOpen={() => handleModalOpen(ServiceOpenModal.ADD)}
            filter={filter}
            setFilter={setFilter}
            selectItems={[selectAll, ...categories]}
            selectedCategory={selectedCategory}
            handleSelect={handleSelect}
          />
        }
        content={
          <Services
            handleModalOpen={handleModalOpen}
            filter={filter}
            selectedCategory={selectedCategory}
          />
        }
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
