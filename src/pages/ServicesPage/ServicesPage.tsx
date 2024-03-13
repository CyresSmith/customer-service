import ServiceModal from 'components/Services/ServiceModal';
import Services from 'components/Services/Services';
import ServicesBar from 'components/Services/ServicesBar';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { ServiceOpenModal } from 'helpers/enums';
import { useState } from 'react';

const ServicesPage = () => {
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
      <PageContentLayout
        bar={
          <ServicesBar
            handleModalOpen={() => handleModalOpen(ServiceOpenModal.ADD)}
          />
        }
        content={<Services handleModalOpen={handleModalOpen} />}
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
