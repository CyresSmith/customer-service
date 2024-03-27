import { useCompanyRefetch } from 'components/Layout/UsersLayout/UsersLayout';
import Modal from 'components/Ui/Modal/Modal';
import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import {
  hoursToMilliseconds,
  millisecondsToHours,
  millisecondsToMinutes,
} from 'date-fns';
import { ServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { HiCurrencyDollar, HiUserGroup } from 'react-icons/hi';
import { toast } from 'react-toastify';
import {
  useGetServiceDataQuery,
  useUpdateServiceDataMutation,
} from 'services/service.api';
import { ServiceCategory } from 'services/types/category.types';
import { EmployeeStatusEnum } from 'services/types/employee.types';
import { IServiceUpdate, ServiceDataType } from 'services/types/service.type';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep';
import { ModalBox, Step, StepBox, StepNumber } from './ServiceModal.styled';
import ThirdStep from './ThirdStep';
import Loader from 'components/Ui/Loader';

type Props = {
  openModal: ServiceOpenModal;
  handleModalClose: () => void;
  serviceId?: number;
  categories: ServiceCategory[];
  refetchCategories: () => void;
  refetchData?: () => void;
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
  capacity: 1,
  placesLimit: false,
  placeLimit: 1,
};

const sectionButtons = [
  { id: 1, label: 'Інформація', Icon: FaInfoCircle },
  { id: 2, label: 'Працівники', Icon: HiUserGroup },
  { id: 3, label: 'Час та вартість', Icon: HiCurrencyDollar },
];

const ServiceModal = ({
  openModal,
  handleModalClose,
  serviceId,
  categories,
  refetchCategories,
  refetchData,
}: Props) => {
  const { accessToken, user } = useAuth();
  const { id, employees } = useCompany();
  const [step, setStep] = useState(1);
  const [serviceData, setServiceData] = useState(initialState);
  const [stateToCheck, setStateToCheck] = useState<ServiceDataType | null>(
    null
  );

  const { refetchCompanyData } = useCompanyRefetch();

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

  const skip = Boolean(!accessToken || !user || !id || !serviceId);

  const { data, isLoading: IsServiceDataLoading } = useGetServiceDataQuery(
    {
      companyId: +id,
      serviceId: Number(serviceId),
    },
    {
      skip,
      refetchOnMountOrArgChange: true,
    }
  );

  const [updateService, { isLoading: isServiceUpdateLoading }] =
    useUpdateServiceDataMutation();

  const handleServiceUpdate = async (data: Partial<IServiceUpdate>) => {
    if (serviceId) {
      const { message } = await updateService({
        companyId: +id,
        serviceId,
        data,
      }).unwrap();

      if (message) {
        setStateToCheck(serviceData);
        refetchData && refetchData();
        toast.success(message);
      }
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

      const newState = state as unknown as ServiceDataType;

      setServiceData(newState);
      setStateToCheck(newState);
    }
  }, [data, openModal]);

  return IsServiceDataLoading ? (
    <Loader />
  ) : (
    <Modal
      id="addService"
      title={
        openModal === ServiceOpenModal.ADD ? 'Створення послуги' : undefined
      }
      $isOpen={openModal !== null}
      closeModal={handleModalClose}
    >
      <ModalBox>
        <div>
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
        </div>

        {step === 1 && (
          <FirstStep
            refetchCategories={refetchCategories}
            categories={categories}
            openModal={openModal}
            setStep={setStep}
            serviceData={serviceData}
            setServiceData={setServiceData}
            stateToCheck={stateToCheck}
            serviceId={serviceId}
            handleServiceUpdate={handleServiceUpdate}
            isServiceUpdateLoading={isServiceUpdateLoading}
            refetchCompanyData={refetchCompanyData}
          />
        )}

        {step === 2 && (
          <SecondStep
            openModal={openModal}
            providers={providers}
            setStep={setStep}
            serviceData={serviceData}
            setServiceData={setServiceData}
            stateToCheck={stateToCheck}
            handleServiceUpdate={handleServiceUpdate}
            isServiceUpdateLoading={isServiceUpdateLoading}
          />
        )}

        {step === 3 && (
          <ThirdStep
            openModal={openModal}
            providers={providers}
            setStep={setStep}
            serviceData={serviceData}
            setServiceData={setServiceData}
            closeModal={handleModalClose}
            stateToCheck={stateToCheck}
            handleServiceUpdate={handleServiceUpdate}
            isServiceUpdateLoading={isServiceUpdateLoading}
            refetchData={refetchData}
          />
        )}
      </ModalBox>
    </Modal>
  );
};

export default ServiceModal;
