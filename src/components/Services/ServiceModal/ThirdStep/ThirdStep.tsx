import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { SelectItem } from 'components/Ui/Form/types';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import { ServiceTypeEnum } from 'helpers/enums';
import generateSelectTimeArray from 'helpers/generateSelectTimeArray';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, FormEvent } from 'react';
import { HiArrowLeft, HiCloudUpload } from 'react-icons/hi';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddNewServiceMutation } from 'services/company.api';
import { IEmployee } from 'services/types/employee.types';
import {
  AddServiceStepProps,
  IEmployeeSettingsDto,
  INewServiceDtoType,
} from 'services/types/service.type';
import EmployeeData from '../EmployeeData';
import { ButtonBox } from '../SecondStep/SecondStep.styled';
import { DurationBox } from '../ServiceModal.styled';
import SettingsBlock from './SettingsBlock';
import {
  CheckboxBox,
  Employee,
  FormBox,
  GeneralSettings,
  List,
  Parameter,
  SettingsBlockBox,
} from './ThirdStep.styled';

const hoursArray = generateSelectTimeArray({
  min: 0,
  max: 24,
  step: 1,
  units: 'год.',
});

const minutesArray = generateSelectTimeArray({
  min: 0,
  max: 55,
  step: 5,
  units: 'хв.',
});

const breakArray = generateSelectTimeArray({
  min: 5,
  max: 60,
  step: 5,
  units: 'хв.',
});

interface Props extends AddServiceStepProps {
  closeModal: () => void;
}

const ThirdStep = ({
  setStep,
  serviceData,
  setServiceData,
  providers,
  closeModal,
}: Props) => {
  const { id: companyId } = useCompany();

  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();
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
      toast.success(`Сервіс "${service.name}" додано`);
      closeModal();
    }
  };

  const stateChange = (e: ChangeEvent<HTMLInputElement>, id?: string) => {
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
    fieldName &&
      setServiceData(p => {
        if (id === undefined) {
          return {
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
          newSettings = [
            ...newSettings,
            { employeeId: id, [fieldName]: selected },
          ];
        } else {
          newSettings[idx] = { ...newSettings[idx], [fieldName]: selected };
        }

        return {
          ...p,
          employeesSettings: newSettings,
        };
      });
  };

  const isEmployeesSettingsChecked =
    serviceData?.employeesSettings?.findIndex(
      item =>
        item?.price === 0 ||
        (item?.durationHours?.id === 0
          ? item?.durationMinutes?.id === 0
          : item?.durationHours?.id === 0)
    ) !== -1;

  const isNextDisabled =
    serviceData.price === 0 ||
    (serviceData?.durationHours?.id === 0
      ? serviceData?.durationMinutes?.id === 0
      : serviceData?.durationHours?.id === 0) ||
    isEmployeesSettingsChecked;

  return (
    <form onSubmit={handleSubmit}>
      <FormBox>
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
      </FormBox>

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
                  />
                </DurationBox>
              )}
            </li>
          </>
        )}
      </CheckboxBox>

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
    </form>
  );
};

export default ThirdStep;
