import Button from 'components/Ui/Buttons/Button';
import Checkbox from 'components/Ui/Form/Checkbox';
import { Form, FormInputsList } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { State, useForm } from 'hooks/useForm';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { useAddNewUserEmployeeMutation } from 'services/company.api';
import { EmployeeRoleEnum } from 'services/types/employee.types';
import { ButtonBox } from '../AddEmployeeModal.styled';

type Props = {
  handleBackClick: () => void;
  closeModal: () => void;
};

const inputs = [
  {
    name: 'email',
    type: 'email',
    isRequired: true,
  },
  { name: 'password', type: 'password', isRequired: true },
  { name: 'confirm', type: 'password', isRequired: true },
  {
    name: 'firstName',
    type: 'text',
    isRequired: true,
  },
  {
    name: 'lastName',
    type: 'text',
  },
  {
    name: 'phone',
    type: 'tel',
    isRequired: true,
  },
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
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  jobTitle: '',
  provider: false,
  password: '',
  confirm: '',
};

function NewUserEmployeeForm({ handleBackClick, closeModal }: Props) {
  const { id, employees } = useCompany();
  const { updateCompanyData } = useActions();
  const [addNewEmployee, { isLoading }] = useAddNewUserEmployeeMutation();

  const onSubmit = async ({
    admin,
    jobTitle,
    provider,
    email,
    phone,
    password,
    firstName,
    lastName,
  }: State) => {
    const employee = await addNewEmployee({
      id,
      data: {
        employeeData: {
          jobTitle,
          provider,
          role: admin ? EmployeeRoleEnum.ADMIN : EmployeeRoleEnum.EMPLOYEE,
        },
        userData: {
          email,
          phone,
          password,
          firstName,
          lastName,
        },
      },
    }).unwrap();

    if (employee) {
      console.log(employee);

      updateCompanyData({
        employees: [...employees, employee],
      });

      closeModal();
    }
  };

  const { state, handleChange, handleSubmit, invalidFields } = useForm<
    typeof initialState
  >(initialState, onSubmit);

  return (
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
  );
}

export default NewUserEmployeeForm;
