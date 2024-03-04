import Modal from 'components/Ui/Modal/Modal';
import { AddServiceOpenModal } from 'helpers/enums';
import { useState } from 'react';
import { ServiceDataType } from 'services/types/service.type';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep';

type Props = {
  openModal: AddServiceOpenModal;
  handleModalClose: () => void;
};

const AddServiceModal = ({ openModal, handleModalClose }: Props) => {
  const [step, setStep] = useState(1);
  console.log('🚀 ~ AddServiceModal ~ step:', step);
  const [serviceData, setServiceData] = useState<Partial<ServiceDataType>>({});
  console.log('🚀 ~ AddServiceModal ~ serviceData:', serviceData);

  const title = () => {
    switch (step) {
      case 1:
        return 'Основні налаштування';

      case 2:
        return 'Робітники, час, вартість ';

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
        <FirstStep setStep={setStep} setServiceData={setServiceData} />
      )}

      {step === 2 && (
        <SecondStep
          setStep={setStep}
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
      )}
    </Modal>
  );
};

export default AddServiceModal;
