import Modal from 'components/Ui/Modal/Modal';
import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import {
  hoursToMilliseconds,
  millisecondsToHours,
  millisecondsToMinutes,
} from 'date-fns';
import { ServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { HiCurrencyDollar } from 'react-icons/hi';
import { HiCalendarDays, HiMiniIdentification } from 'react-icons/hi2';
import {
  useGetServiceDataQuery,
  useUploadServiceAvatarMutation,
} from 'services/company.api';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import { ServiceDataType } from 'services/types/service.type';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep';
import { Step, StepBox, StepNumber } from './ServiceModal.styled';
import ThirdStep from './ThirdStep';

type Props = {
  openModal: ServiceOpenModal;
  handleModalClose: () => void;
  serviceId?: number;
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

const sectionButtons = [
  { id: 1, label: 'Інформація', Icon: HiMiniIdentification },
  { id: 2, label: 'Працівники', Icon: HiCalendarDays },
  { id: 3, label: 'Час та вартість', Icon: HiCurrencyDollar },
];

const ServiceModal = ({ openModal, handleModalClose, serviceId }: Props) => {
  const { id, employees } = useCompany();
  const [step, setStep] = useState(1);
  const [serviceData, setServiceData] = useState(initialState);

  const providers = employees.filter(
    ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
  );

  const title = () => {
    switch (step) {
      case 1:
        return 'Інформація';

      case 2:
        return 'Вибір працівників';

      case 3:
        return 'Час та вартість';

      default:
        return 'Створення послуги';
    }
  };

  const {
    data,
    isLoading: IsServiceDataLoading,
    refetch,
  } = useGetServiceDataQuery(
    {
      companyId: +id,
      serviceId: Number(serviceId),
    },
    { skip: serviceId === undefined || id === undefined }
  );

  const [uploadImg, { isLoading: isAvatarLoading }] =
    useUploadServiceAvatarMutation();

  const handleUpload = async (file: File) => {
    const data = new FormData();
    data.append('avatar', file);

    if (serviceId) {
      const { url } = await uploadImg({
        companyId: +id,
        serviceId,
        data,
      }).unwrap();

      if (url) refetch();
    }
  };

  useEffect(() => {
    if (!data) return;

    if (openModal === ServiceOpenModal.EDIT_SERVICE && data) {
      let { id, createdAt, updatedAt, ...state } = data;

      const hours = millisecondsToHours(data.duration);
      const minutes = millisecondsToMinutes(
        data.duration - hoursToMilliseconds(hours)
      );

      state = Object.assign(state, {
        category: { id: data.category.id, value: data.category.name },
        employees: data.employees.map(({ id }) => id),
        durationHours: { id: hours, value: `${hours} год` },
        durationMinutes: { id: minutes, value: `${minutes} хв` },
        break: data.break ? data.break > 0 : false,
        capacityLimit: data.capacity > 1,
        capacity: data.capacity,
        placesLimit: Boolean(data.placeLimit),
        placeLimit: data.placeLimit,
      });

      if (data.break && data.break > 0) {
        const minutes = millisecondsToMinutes(data.break);

        state = Object.assign(state, {
          breakDuration: {
            id: minutes,
            value: `${minutes} хв`,
          },
        });
      }

      if (data.employeesSettings.length > 0) {
        state = Object.assign(state, {
          employeesSettings: data.employeesSettings.map(
            ({ employeeId, price, duration }) => {
              let settings = {
                employeeId,
              };

              if (price) {
                settings = Object.assign(settings, { price });
              }

              if (duration) {
                const hours = millisecondsToHours(duration);
                const minutes = millisecondsToMinutes(
                  duration - hoursToMilliseconds(hours)
                );

                settings = Object.assign(settings, {
                  durationHours: { id: hours, value: `${hours} год` },
                  durationMinutes: { id: minutes, value: `${minutes} хв` },
                });
              }

              return settings;
            }
          ),
        });
      }

      setServiceData(state as unknown as ServiceDataType);
    }
  }, [data, openModal]);

  return (
    <>
      <Modal
        id="addService"
        title={
          openModal === ServiceOpenModal.ADD ? 'Створення послуги' : undefined
        }
        $isOpen={openModal !== null}
        closeModal={handleModalClose}
      >
        {openModal === ServiceOpenModal.ADD && (
          <StepBox>
            {Array.from({ length: 3 }).map((_, i) => (
              <Step $current={i + 1 === step} $color={i + 1 <= step} key={i}>
                <StepNumber $current={i + 1 <= step}>{i + 1}</StepNumber>
                <p>{title()}</p>
              </Step>
            ))}
          </StepBox>
        )}

        {openModal === ServiceOpenModal.EDIT_SERVICE && (
          <>
            <ModalHeaderWithAvatar
              avatar={serviceData.avatar || data?.avatar || ''}
              title={serviceData.name}
              subtitle={serviceData.category?.value || ''}
            />

            <ModalSectionsList
              sectionButtons={sectionButtons}
              currentSection={step}
              handleSectionSelect={setStep}
            />
          </>
        )}

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
            closeModal={handleModalClose}
          />
        )}
      </Modal>
    </>
  );
};

export default ServiceModal;
