import Modal from 'components/Ui/Modal/Modal';
import { AddServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { useState } from 'react';
import { ServiceDataType } from 'services/types/service.type';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

type Props = {
  openModal: AddServiceOpenModal;
  handleModalClose: () => void;
};

const AddServiceModal = ({ openModal, handleModalClose }: Props) => {
  const [step, setStep] = useState(1);
  const [serviceData, setServiceData] = useState<Partial<ServiceDataType>>({
    type: ServiceTypeEnum.INDIVIDUAL,
  });

  const title = () => {
    switch (step) {
      case 1:
        return 'Основні налаштування';

      case 2:
        return 'Вибір працівників';

      default:
        break;
    }
  };

  return (
    <Modal
      id="addService"
      title={title()}
      $isOpen={openModal !== null}
      closeModal={handleModalClose}
    >
      {step === 1 && (
        <FirstStep
          setStep={setStep}
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
      )}

      {step === 2 && (
        <SecondStep
          setStep={setStep}
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
      )}

      {step === 3 && (
        <ThirdStep
          setStep={setStep}
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
      )}
    </Modal>
  );
};

export default AddServiceModal;
