import Button from 'components/Ui/Buttons/Button';
import { Form, FormInputsList } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useActions, useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
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
    label: false,
  },
  {
    name: 'isAdmin',
    type: 'checkbox',
    label: false,
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

  const onSubmit = async ({
    jobTitle,
    provider,
    isAdmin,
  }: typeof initialState) => {
    const employee = await addEmployee({
      id,
      data: {
        userId,
        employeeData: {
          jobTitle,
          provider,
          role: isAdmin ? EmployeeRoleEnum.ADMIN : EmployeeRoleEnum.EMPLOYEE,
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
          {inputs.map((item, i) => (
            <CustomFormInput
              {...item}
              key={i}
              value={state[item.name as keyof typeof initialState]}
              handleChange={handleChange}
              isValid={getErrorMessage(item.name, invalidFields)}
            />
          ))}
        </FormInputsList>

        <ButtonBox>
          <Button Icon={HiArrowLeft} $colors="light" onClick={handleBackClick}>
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
