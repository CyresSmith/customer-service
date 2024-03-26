import { useCompanyRefetch } from 'components/Layout/UsersLayout/UsersLayout';
import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { SelectItem } from 'components/Ui/Form/types';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import { ServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import generateSelectTimeArray from 'helpers/generateSelectTimeArray';
import { useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, FormEvent } from 'react';
import { HiArrowLeft, HiCloudUpload } from 'react-icons/hi';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useAddNewServiceMutation } from 'services/service.api';
import { IEmployee } from 'services/types/employee.types';
import {
  EmployeesServiceSettings,
  IEmployeeSettingsDto,
  INewServiceDtoType,
  IServiceUpdate,
  ServiceDataType,
  ServiceStepProps,
} from 'services/types/service.type';
import EmployeeData from '../EmployeeData';
import { ButtonBox } from '../SecondStep/SecondStep.styled';
import {
  DurationBox,
  ButtonBox as SaveButtonBox,
  StepFormBox,
} from '../ServiceModal.styled';
import SettingsBlock from './SettingsBlock';
import {
  CheckboxBox,
  Employee,
  GeneralSettings,
  List,
  Parameter,
  SettingsBlockBox,
} from './ThirdStep.styled';

const hoursArray = generateSelectTimeArray({
  min: 0,
  max: 24,
  step: 1,
  units: 'год',
});

const minutesArray = generateSelectTimeArray({
  min: 0,
  max: 55,
  step: 5,
  units: 'хв',
});

const breakArray = generateSelectTimeArray({
  min: 5,
  max: 60,
  step: 5,
  units: 'хв',
});

interface Props extends ServiceStepProps {
  closeModal: () => void;
  refetchData?: () => void;
}

const ThirdStep = ({
  openModal,
  setStep,
  serviceData,
  setServiceData,
  providers,
  closeModal,
  stateToCheck,
  handleServiceUpdate,
  isServiceUpdateLoading,
  refetchData,
}: Props) => {
  const { id: companyId } = useCompany();
  const isAdmin = useAdminRights();

  const { refetchCompanyData } = useCompanyRefetch();

  const [addNewService, { isLoading }] = useAddNewServiceMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data: Partial<INewServiceDtoType> = Object.fromEntries(
      Object.entries(serviceData).filter(
        ([key]) =>
          key !== 'category' &&
          key !== 'durationHours' &&
          key !== 'durationMinutes' &&
          key !== 'break' &&
          key !== 'breakDuration' &&
          key !== 'employeesSettings' &&
          key !== 'placesLimit' &&
          key !== 'capacityLimit'
      )
    );

    if (serviceData.category?.id) {
      data.category = +serviceData.category?.id;
    }

    let duration = 0;

    if (serviceData.durationHours?.id) {
      duration = duration + hoursToMilliseconds(+serviceData.durationHours?.id);
    }

    if (serviceData.durationMinutes?.id) {
      duration =
        duration + minutesToMilliseconds(+serviceData.durationMinutes.id);
    }

    if (duration > 0) data.duration = duration;

    if (serviceData.break && serviceData.breakDuration?.id) {
      data.break = minutesToMilliseconds(+serviceData.breakDuration.id);
    }

    if (serviceData.employeesSettings.length > 0) {
      data.employeesSettings = serviceData.employeesSettings.map(item => {
        const settings: IEmployeeSettingsDto = {
          employeeId: item.employeeId,
        };

        if (item.price) {
          settings.price = item.price;
        }

        let duration = 0;

        if (item.durationHours?.id) {
          duration = duration + hoursToMilliseconds(+item.durationHours?.id);
        }

        if (item.durationMinutes?.id) {
          duration = duration + minutesToMilliseconds(+item.durationMinutes.id);
        }

        if (duration > 0) settings.duration = duration;

        return settings;
      });
    }

    if (serviceData.capacityLimit && serviceData.capacity > 0) {
      data.capacity = serviceData.capacity;
    }

    if (serviceData.placesLimit && serviceData.placeLimit > 0) {
      data.placeLimit = serviceData.placeLimit;
    }

    if (data.desc === '') {
      delete data.desc;
    }

    const service = await addNewService({
      companyId,
      data: data as INewServiceDtoType,
    }).unwrap();

    if (service && service.id) {
      refetchCompanyData();
      refetchData && refetchData();
      toast.success(`Сервіс "${service.name}" додано`);
      closeModal();
    }
  };

  const stateChange = (e: ChangeEvent<HTMLInputElement>, id?: string) => {
    if (!isAdmin) return;

    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      if (name === 'break' && !serviceData.break) {
        setServiceData(p => ({ ...p, breakDuration: breakArray[0] }));
      }

      return setServiceData(p => ({
        ...p,
        [name]: !p?.[name as keyof typeof p],
      }));
    }

    const newValue = Number.isNaN(+value)
      ? 0
      : +value >= 999999
      ? 999999
      : +value;

    setServiceData(p => {
      if (id === undefined) {
        return {
          ...p,
          [name]: newValue,
          employeesSettings: p.employeesSettings?.map(item => ({
            ...item,
            [name]: newValue,
          })),
        };
      }

      let newSettings = [...p.employeesSettings];

      const idx = newSettings.findIndex(({ employeeId }) => employeeId === id);

      if (idx === -1) {
        newSettings = [...newSettings, { employeeId: id, [name]: newValue }];
      } else {
        newSettings[idx] = { ...newSettings[idx], [name]: newValue };
      }

      return {
        ...p,
        employeesSettings: newSettings,
      };
    });
  };

  const stateSelect = (
    selected: SelectItem,
    fieldName?: string,
    id?: string
  ) => {
    if (!isAdmin) return;

    fieldName &&
      setServiceData(p => {
        if (id === undefined) {
          return fieldName === 'durationHours' && selected.id === 24
            ? {
                ...p,
                [fieldName]: selected,
                durationMinutes: minutesArray[0],
                employeesSettings: p.employeesSettings?.map(item => ({
                  ...item,
                  [fieldName]: selected,
                  durationMinutes: minutesArray[0],
                })),
              }
            : {
                ...p,
                [fieldName]: selected,
                employeesSettings: p.employeesSettings?.map(item => ({
                  ...item,
                  [fieldName]: selected,
                })),
              };
        }

        let newSettings = [...p.employeesSettings];

        const idx = newSettings.findIndex(
          ({ employeeId }) => employeeId === id
        );

        if (idx === -1) {
          newSettings =
            fieldName === 'durationHours' && selected.id === 24
              ? [
                  ...newSettings,
                  {
                    employeeId: id,
                    [fieldName]: selected,
                    durationMinutes: minutesArray[0],
                  },
                ]
              : [...newSettings, { employeeId: id, [fieldName]: selected }];
        } else {
          newSettings[idx] =
            fieldName === 'durationHours' && selected.id === 24
              ? {
                  ...newSettings[idx],
                  [fieldName]: selected,
                  durationMinutes: minutesArray[0],
                }
              : { ...newSettings[idx], [fieldName]: selected };
        }

        return {
          ...p,
          employeesSettings: newSettings,
        };
      });
  };

  const isEmployeesSettingsChecked = (data: ServiceDataType) =>
    data?.employeesSettings?.findIndex(
      item =>
        item?.price === 0 ||
        (item?.durationHours?.id === 0
          ? item?.durationMinutes?.id === 0
          : item?.durationHours?.id === 0)
    ) !== -1;

  const isNextDisabled =
    serviceData.price === 0 ||
    // (serviceData.durationHours === null
    //   ? serviceData.durationMinutes === null
    //   : serviceData.durationHours === null) ||
    (serviceData?.durationHours?.id === 0 || serviceData?.durationHours === null
      ? serviceData?.durationMinutes?.id === 0 ||
        serviceData?.durationMinutes === null
      : serviceData?.durationHours?.id === 0 ||
        serviceData?.durationHours === null) ||
    isEmployeesSettingsChecked(serviceData);

  const checkString = JSON.stringify({
    price: stateToCheck?.price,
    durationHours: stateToCheck?.durationHours,
    durationMinutes: stateToCheck?.durationMinutes,
    employeesSettings: stateToCheck?.employeesSettings,
    break: stateToCheck?.break,
    breakDuration: stateToCheck?.breakDuration,
    placesLimit: stateToCheck?.placesLimit,
    placeLimit: stateToCheck?.placeLimit,
    capacity: stateToCheck?.capacity,
    capacityLimit: stateToCheck?.capacityLimit,
  });

  const updateObj = {
    price: serviceData.price,
    durationHours: serviceData.durationHours,
    durationMinutes: serviceData.durationMinutes,
    employeesSettings: serviceData.employeesSettings,
    break: serviceData.break,
    breakDuration: serviceData.breakDuration,
    placesLimit: serviceData.placesLimit,
    placeLimit: serviceData.placeLimit,
    capacity: serviceData.capacity,
    capacityLimit: serviceData.capacityLimit,
  };

  const serviceUpdate = async () => {
    const data: Partial<IServiceUpdate> = Object.fromEntries(
      Object.entries(updateObj).filter(
        ([key]) =>
          key !== 'durationHours' &&
          key !== 'durationMinutes' &&
          key !== 'break' &&
          key !== 'breakDuration' &&
          key !== 'employeesSettings' &&
          key !== 'placesLimit' &&
          key !== 'capacityLimit'
      )
    );

    let duration = 0;

    if (updateObj.durationHours?.id) {
      duration = duration + hoursToMilliseconds(+updateObj.durationHours?.id);
    }

    if (updateObj.durationMinutes?.id) {
      duration =
        duration + minutesToMilliseconds(+updateObj.durationMinutes.id);
    }

    if (duration > 0) data.duration = duration;

    if (updateObj.break && updateObj.breakDuration?.id) {
      data.break = minutesToMilliseconds(+updateObj.breakDuration.id);
    }

    if (updateObj.employeesSettings.length > 0) {
      data.employeesSettings = updateObj.employeesSettings.map(item => {
        const settings: EmployeesServiceSettings = {
          employeeId: +item.employeeId,
        };

        if (item.price) {
          settings.price = item.price;
        }

        let duration = 0;

        if (item.durationHours?.id) {
          duration = duration + hoursToMilliseconds(+item.durationHours?.id);
        }

        if (item.durationMinutes?.id) {
          duration = duration + minutesToMilliseconds(+item.durationMinutes.id);
        }

        if (duration > 0) settings.duration = duration;

        return settings;
      });
    }

    if (updateObj.capacityLimit && updateObj.capacity > 0) {
      data.capacity = updateObj.capacity;
    }

    if (updateObj.placesLimit && updateObj.placeLimit > 0) {
      data.placeLimit = updateObj.placeLimit;
    }

    handleServiceUpdate(data);
  };

  const stateString = JSON.stringify(updateObj);

  const saveDisabled =
    checkString === stateString ||
    serviceData.price === 0 ||
    (serviceData.durationHours?.id === 0 &&
      serviceData.durationMinutes?.id === 0) ||
    serviceData.employeesSettings.find(item =>
      Boolean(
        item?.price === 0 ||
          (item?.durationHours?.id === 0 && item?.durationMinutes?.id === 0)
      )
    );

  return (
    <StepFormBox onSubmit={handleSubmit}>
      <div>
        <SettingsBlockBox as="ul">
          <Parameter>Призначення</Parameter>
          <Parameter>Ціна, грн</Parameter>
          <Parameter>Час</Parameter>
        </SettingsBlockBox>

        <List>
          <SettingsBlock
            handleChange={stateChange}
            handleSelect={stateSelect}
            durationHoursItems={hoursArray}
            durationHoursValue={serviceData?.durationHours || hoursArray[0]}
            durationMinutesItems={minutesArray}
            durationMinutesValue={
              serviceData?.durationMinutes || minutesArray[0]
            }
            priceValue={serviceData?.price || 0}
          >
            <GeneralSettings>Загальні налаштування</GeneralSettings>
          </SettingsBlock>

          {serviceData?.employees &&
            serviceData?.employees.length > 0 &&
            serviceData.employees.map(id => {
              const settings = serviceData.employeesSettings?.find(
                ({ employeeId }) => employeeId === id
              );

              const userData = providers?.find(
                ({ id: employeeId }) => +employeeId === +id
              );

              if (!userData) return;

              return (
                <SettingsBlock
                  key={id}
                  handleChange={e => stateChange(e, id)}
                  handleSelect={(selected, fieldName) =>
                    stateSelect(selected, fieldName, id)
                  }
                  durationHoursItems={hoursArray}
                  durationHoursValue={
                    settings?.durationHours ||
                    serviceData.durationHours ||
                    hoursArray[0]
                  }
                  durationMinutesItems={minutesArray}
                  durationMinutesValue={
                    settings?.durationMinutes ||
                    serviceData.durationMinutes ||
                    minutesArray[0]
                  }
                  priceValue={
                    settings?.price || settings?.price === 0
                      ? settings?.price
                      : serviceData?.price
                  }
                  employeeId={id}
                >
                  <Employee>
                    <EmployeeData
                      {...(userData as IEmployee)}
                      checkIcon={false}
                    />
                  </Employee>
                </SettingsBlock>
              );
            })}
        </List>

        <CheckboxBox>
          <li>
            <CustomFormInput
              name="break"
              type="checkbox"
              value={serviceData.break}
              handleChange={stateChange}
              disabledIcon
            />

            {serviceData.break && (
              <DurationBox>
                <CustomFormInput
                  name="breakDuration"
                  label={false}
                  type="select"
                  value={serviceData.breakDuration || breakArray[0]}
                  selectItems={breakArray}
                  handleSelect={(selected, fieldName) =>
                    stateSelect(selected, fieldName)
                  }
                  disabledIcon
                  isReadonly={!isAdmin}
                />
              </DurationBox>
            )}
          </li>

          {serviceData.type === ServiceTypeEnum.GROUP && (
            <>
              <li>
                <CustomFormInput
                  name="capacityLimit"
                  type="checkbox"
                  value={serviceData.capacityLimit}
                  handleChange={stateChange}
                  disabledIcon
                />

                {serviceData.capacityLimit && (
                  <DurationBox>
                    <CustomFormInput
                      name="capacity"
                      label={false}
                      type="text"
                      value={serviceData.capacity || 0}
                      handleChange={stateChange}
                      disabledIcon
                    />
                  </DurationBox>
                )}
              </li>

              <li>
                <CustomFormInput
                  name="placesLimit"
                  type="checkbox"
                  value={serviceData.placesLimit}
                  handleChange={stateChange}
                  disabledIcon
                />

                {serviceData.placesLimit && (
                  <DurationBox>
                    <CustomFormInput
                      name="placeLimit"
                      label={false}
                      type="text"
                      value={serviceData.placeLimit || 1}
                      handleChange={stateChange}
                      disabledIcon
                      isReadonly={!isAdmin}
                    />
                  </DurationBox>
                )}
              </li>
            </>
          )}
        </CheckboxBox>
      </div>

      {openModal === ServiceOpenModal.EDIT_SERVICE && isAdmin && (
        <SaveButtonBox>
          <Button
            onClick={serviceUpdate}
            disabled={Boolean(saveDisabled) || isServiceUpdateLoading}
            Icon={IoIosSave}
            $colors="accent"
            isLoading={isServiceUpdateLoading}
          >
            Зберегти
          </Button>
        </SaveButtonBox>
      )}

      {openModal === ServiceOpenModal.ADD && (
        <ButtonBox>
          <Button
            $colors="light"
            Icon={HiArrowLeft}
            $iconPosition="l"
            onClick={() => setStep(p => p - 1)}
          >
            Назад
          </Button>

          <Button
            type="submit"
            $colors="accent"
            disabled={Boolean(isNextDisabled) || isLoading}
            Icon={HiCloudUpload}
            isLoading={isLoading}
          >
            Додати
          </Button>
        </ButtonBox>
      )}
    </StepFormBox>
  );
};

export default ThirdStep;
