import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { SelectItem } from 'components/Ui/Form/types';
import { ServiceTypeEnum } from 'helpers/enums';
import generateSelectTimeArray from 'helpers/generateSelectTimeArray';
import { ChangeEvent } from 'react';
import { HiArrowLeft, HiCloudUpload } from 'react-icons/hi';
import { useAddNewServiceMutation } from 'services/company.api';
import { IEmployee } from 'services/types/employee.types';
import { AddServiceStepProps } from 'services/types/service.type';
import { DurationBox } from '../AddServiceModal.styled';
import EmployeeData from '../EmployeeData';
import { ButtonBox } from '../SecondStep/SecondStep.styled';
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

const ThirdStep = ({
  setStep,
  serviceData,
  setServiceData,
  providers,
}: AddServiceStepProps) => {
  const [addNewService, { isLoading }] = useAddNewServiceMutation();

  const handleSubmit = () => {};

  const stateChange = (e: ChangeEvent<HTMLInputElement>, id?: string) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
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
    <form>
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
          disabled={Boolean(isNextDisabled)}
          Icon={HiCloudUpload}
        >
          Додати
        </Button>
      </ButtonBox>
    </form>
  );
};

export default ThirdStep;
