import Modal from 'components/Ui/Modal/Modal';
import { AddServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import { ServiceDataType } from 'services/types/service.type';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

type Props = {
  openModal: AddServiceOpenModal;
  handleModalClose: () => void;
};

const initialState: ServiceDataType = {
  type: ServiceTypeEnum.INDIVIDUAL,
  category: null,
  name: '',
  desc: '',
  employees: [],
  durationHours: null,
  durationMinutes: null,
  price: 0,
  break: false,
  employeesSettings: [],
  capacityLimit: false,
  capacity: 0,
  placesLimit: false,
  placeLimit: 1,
};

const AddServiceModal = ({ openModal, handleModalClose }: Props) => {
  const { employees } = useCompany();
  const [step, setStep] = useState(1);
  const [serviceData, setServiceData] = useState(initialState);

  const providers = employees.filter(
    ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
  );

  const title = () => {
    switch (step) {
      case 1:
        return 'Тип, назва та опис';

      case 2:
        return 'Вибір працівників';

      case 3:
        return 'Час та вартість';

      default:
        return 'Створення послуги';
    }
  };

  return (
    <>
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
            providers={providers}
            setStep={setStep}
            serviceData={serviceData}
            setServiceData={setServiceData}
          />
        )}

        {step === 3 && (
          <ThirdStep
            providers={providers}
            setStep={setStep}
            serviceData={serviceData}
            setServiceData={setServiceData}
          />
        )}
      </Modal>
    </>
  );
};

export default AddServiceModal;
