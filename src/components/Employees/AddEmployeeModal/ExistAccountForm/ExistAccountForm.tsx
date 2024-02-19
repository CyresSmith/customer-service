import Button from 'components/Ui/Buttons/Button';
import Checkbox from 'components/Ui/Form/Checkbox';
import { Form, FormInputsList } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useActions, useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { State } from 'hooks/useForm';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { useAddExistUserEmployeeMutation } from 'services/company.api';
import { EmployeeRoleEnum } from 'services/types/employee.types';
import { ButtonBox } from '../AddEmployeeModal.styled';

type Props = {
  userId: string;
  handleBackClick: () => void;
  closeModal: () => void;
};

const inputs = [
  {
    name: 'jobTitle',
    type: 'text',
    isRequired: true,
  },
  {
    name: 'provider',
    type: 'checkbox',
  },
  {
    name: 'isAdmin',
    type: 'checkbox',
  },
];

const initialState = {
  jobTitle: '',
  provider: false,
  isAdmin: false,
};

const ExistAccountForm = ({ userId, handleBackClick, closeModal }: Props) => {
  const { id, employees } = useCompany();
  const { updateCompanyData } = useActions();

  const onSubmit = async ({ jobTitle, provider, admin }: State) => {
    const employee = await addEmployee({
      id,
      data: {
        userId,
        employeeData: {
          jobTitle,
          provider,
          role: admin ? EmployeeRoleEnum.ADMIN : EmployeeRoleEnum.EMPLOYEE,
        },
      },
    }).unwrap();

    if (employee) {
      updateCompanyData({
        employees: [...employees, employee],
      });

      closeModal();
    }
  };

  const { state, handleChange, handleSubmit, invalidFields } = useForm<
    typeof initialState
  >(initialState, onSubmit);

  const [addEmployee, { isLoading }] = useAddExistUserEmployeeMutation();

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormInputsList>
          {inputs.map(({ name, type, isRequired = false }, i) =>
            type === 'checkbox' ? (
              <Checkbox
                key={i}
                name={name}
                isRequired={isRequired}
                isChecked={Boolean(state[name as keyof typeof initialState])}
                handleCheck={handleChange}
              />
            ) : (
              <CustomFormInput
                key={i}
                type={type}
                name={name}
                value={String(state[name as keyof typeof initialState])}
                handleChange={handleChange}
                isValid={getErrorMessage(name, invalidFields)}
                isRequired={isRequired}
              />
            )
          )}
        </FormInputsList>

        <ButtonBox>
          <Button
            Icon={HiArrowLeft}
            type="submit"
            $colors="light"
            onClick={handleBackClick}
          >
            Назад
          </Button>

          <Button
            isLoading={isLoading}
            Icon={HiPlusCircle}
            type="submit"
            disabled={Object.values(state).includes('') || isLoading}
            $colors="accent"
          >
            Додати
          </Button>
        </ButtonBox>
      </Form>
    </>
  );
};

export default ExistAccountForm;
