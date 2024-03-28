import Button from 'components/Ui/Buttons/Button';
import { Form, FormInputsList } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { InputProps } from 'components/Ui/Form/types';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useCompany } from 'hooks/useCompany';
import { useForm } from 'hooks/useForm';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { useAddNewUserEmployeeMutation } from 'services/employee.api';
import { EmployeeRoleEnum } from 'services/types/employee.types';
import { ButtonBox } from '../AddEmployeeModal.styled';

type Props = {
  handleBackClick: () => void;
  closeModal: () => void;
};

const inputs: Partial<InputProps>[] = [
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
    label: false,
  },
  {
    name: 'isAdmin',
    type: 'checkbox',
    label: false,
  },
];

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  jobTitle: '',
  provider: false,
  isAdmin: false,
  password: '',
  confirm: '',
};

function NewUserEmployeeForm({ handleBackClick, closeModal }: Props) {
  const { id } = useCompany();
  const [addNewEmployee, { isLoading, isSuccess }] = useAddNewUserEmployeeMutation();

  const onSubmit = async ({
    isAdmin,
    jobTitle,
    provider,
    email,
    phone,
    password,
    firstName,
    lastName,
  }: typeof initialState) => {
    const employee = await addNewEmployee({
      companyId: id,
      data: {
        employeeData: {
          jobTitle,
          provider,
          role: isAdmin ? EmployeeRoleEnum.ADMIN : EmployeeRoleEnum.EMPLOYEE,
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

    if (employee && isSuccess) {
      closeModal();
    }
  };

  const { state, handleChange, handleSubmit, invalidFields } = useForm<
    typeof initialState
  >(initialState, onSubmit);

  return (
    <Form onSubmit={handleSubmit}>
      <FormInputsList>
        {(inputs as InputProps[]).map((item, i) => (
          <CustomFormInput
            key={i}
            {...item}
            value={state[item.name as keyof typeof initialState]}
            handleChange={handleChange}
            isValid={getErrorMessage(item.name, invalidFields)}
          />
        ))}
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
          Додать
        </Button>
      </ButtonBox>
    </Form>
  );
}

export default NewUserEmployeeForm;
