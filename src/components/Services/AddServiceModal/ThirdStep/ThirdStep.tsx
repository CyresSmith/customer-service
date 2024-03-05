import Button from 'components/Ui/Buttons/Button';
import {
  FormInputLabel,
  FormInputsListItem,
  Required,
} from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import {
  InputProps,
  InputValueType,
  SelectItem,
} from 'components/Ui/Form/types';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { HiCloudUpload } from 'react-icons/hi';
import {
  ButtonBox,
  DurationBox,
  FormBox,
  TimeBox,
} from '../AddServiceModal.styled';

type InitialStateType = {
  employees: [] | SelectItem[];
  durationHours: number;
  durationMinutes: number;
  break: boolean;
  breakDuration: number;
};

const initialState: InitialStateType = {
  employees: [],
  durationHours: 0,
  durationMinutes: 0,
  break: false,
  breakDuration: 5,
};

const ThirdStep = ({
  setStep,
  serviceData,
  setServiceData,
}: AddServiceStepProps) => {
  const { id, employees } = useCompany();

  const inputs: Partial<InputProps>[] = [
    {
      name: 'employees',
      type: 'select',
      selectItems: employees
        .filter(({ provider }) => provider)
        .map(({ id, firstName, lastName }) => ({
          id,
          value: lastName ? firstName + ' ' + lastName : firstName,
        })),
    },
    {
      name: 'durationHours',
      type: 'number',
    },
    {
      name: 'durationMinutes',
      type: 'number',
    },
    { name: 'break', type: 'checkbox', label: false },
    {
      name: 'breakDuration',
      type: 'number',
    },
  ];

  const onSubmit = (state: InitialStateType) => {
    console.log('🚀 ~ onSubmit ~ state:', state);
    // let stepData = {
    //   employees: state.employees.map(item => Number(item.id)),
    //   duration: state.duration,
    // };
    // if (state.break) {
    //   stepData = Object.assign(stepData, { break: state.breakDuration.value });
    // }
    // setServiceData(p => ({ ...p, ...stepData } as ServiceDataType));
  };

  const { handleChange, handleSubmit, handleSelect, invalidFields, state } =
    useForm(initialState, onSubmit);

  console.log('🚀 ~ SecondStep ~ state:', state);

  const timeNotSet =
    state.durationMinutes === 0
      ? state.durationHours === 0
      : state.durationMinutes === 0;

  const isSubmitDisabled =
    invalidFields.length > 0 || state.employees.length === 0 || timeNotSet;

  return (
    <FormBox onSubmit={handleSubmit}>
      {(inputs as InputProps[]).map((item, i) => {
        if (!state.break && item.name === 'breakDuration') return;

        if (item.name === 'durationHours') {
          const durationMinutes = inputs[i + 1] as InputProps;

          return (
            <FormInputsListItem>
              <FormInputLabel>
                Тривалість
                {item.isRequired && <Required>{' (!)'}</Required>}
              </FormInputLabel>

              <DurationBox>
                <TimeBox>
                  <CustomFormInput
                    key={i}
                    {...item}
                    label={false}
                    value={Number(state[item.name as keyof InputValueType])}
                    handleChange={handleChange}
                    isValid={getErrorMessage(item.name, invalidFields)}
                    disabledIcon
                    min={0}
                    max={23}
                  />
                  <span>
                    {state[item.name as keyof InputValueType] === 1
                      ? 'година'
                      : 'годин'}
                  </span>
                </TimeBox>

                <TimeBox>
                  <CustomFormInput
                    label={false}
                    key={i + 1}
                    min={0}
                    max={55}
                    step={5}
                    {...durationMinutes}
                    value={Number(
                      state[durationMinutes.name as keyof InputValueType]
                    )}
                    handleChange={handleChange}
                    handleSelect={handleSelect}
                    disabledIcon
                    isValid={getErrorMessage(
                      durationMinutes.name,
                      invalidFields
                    )}
                  />
                  <span>
                    {state[durationMinutes.name as keyof InputValueType] === 1
                      ? 'хвилина'
                      : 'хвилин'}
                  </span>
                </TimeBox>
              </DurationBox>
            </FormInputsListItem>
          );
        }

        if (item.name === 'breakDuration') {
          return (
            <FormInputsListItem>
              <FormInputLabel>
                Тривалість перерви
                {item.isRequired && <Required>{' (!)'}</Required>}
              </FormInputLabel>

              <TimeBox>
                <CustomFormInput
                  label={false}
                  key={i}
                  min={5}
                  max={60}
                  step={5}
                  {...item}
                  value={Number(state[item.name as keyof InputValueType])}
                  handleChange={handleChange}
                  handleSelect={handleSelect}
                  disabledIcon
                  isValid={getErrorMessage(item.name, invalidFields)}
                />
                <span>
                  {state[item.name as keyof InputValueType] === 1
                    ? 'хвилина'
                    : 'хвилин'}
                </span>
              </TimeBox>
            </FormInputsListItem>
          );
        }

        if (item.name === 'durationMinutes') return;

        return (
          <CustomFormInput
            key={i}
            {...item}
            value={state[item.name as keyof InputValueType]}
            handleChange={handleChange}
            handleSelect={handleSelect}
            isValid={getErrorMessage(item.name, invalidFields)}
          />
        );
      })}

      <ButtonBox>
        <Button
          disabled={isSubmitDisabled}
          type="submit"
          Icon={HiCloudUpload}
          $colors="accent"
        >
          Додати
        </Button>
      </ButtonBox>
    </FormBox>
  );
};

export default ThirdStep;
