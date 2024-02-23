import Button from 'components/Ui/Buttons/Button';
import Checkbox from 'components/Ui/Form/Checkbox';
import { Form } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { InputProps } from 'components/Ui/Form/types';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useActions, useAdminRights, useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { IoIosSave } from 'react-icons/io';
import { useOutletContext } from 'react-router-dom';
import { useUpdateEmployeeProfileMutation } from 'services/employee.api';
import {
  EmployeeRoleEnum,
  IEmployee,
  UpdateEmployeeProfile,
} from 'services/types/employee.types';
import {
  ButtonBox,
  FormInputsList,
  ProfileInfoBox,
} from './ProfileInfo.styled';

type Props = { employee: IEmployee };

const inputs: InputProps[] = [
  { name: 'firstName', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'phone', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'birthday', type: 'date' },
  { name: 'jobTitle', type: 'text' },
  { name: 'info', type: 'textarea' },
  { name: 'provider', type: 'checkbox' },
];

const ProfileInfo = ({ employee }: Props) => {
  const {
    info,
    jobTitle,
    provider,
    user,
    role,
    email,
    firstName,
    lastName,
    phone,
    id: employeeId,
    birthday,
  } = employee;

  const isAdmin = useAdminRights();
  const { id: companyId, employees } = useCompany();
  const { updateCompanyData } = useActions();

  const initialState = {
    firstName: firstName || user.firstName || '',
    lastName: lastName || user.lastName || '',
    phone: phone || user.phone || '',
    email: email || user.email || '',
    jobTitle: role === EmployeeRoleEnum.OWNER ? 'Власник' : jobTitle || '',
    provider: provider || false,
    info: info || '',
    birthday: birthday || '',
  };

  const [updateProfile, { isLoading }] = useUpdateEmployeeProfileMutation();
  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const onSubmit = async (state: typeof initialState) => {
    const data: UpdateEmployeeProfile = {};

    Object.entries(state).map(([key, value]) => {
      if (value === '') return;

      Object.assign(data, { [key]: value });
    });

    const { message } = await updateProfile({
      companyId,
      employeeId,
      data,
    }).unwrap();

    if (message) {
      updateCompanyData({
        employees: employees.map(item =>
          item.id !== employeeId ? item : { ...item, ...data }
        ),
      });

      refetchCompanyData();
    }
  };

  const { state, handleChange, handleSubmit, invalidFields } = useForm<
    typeof initialState
  >(initialState, onSubmit);

  return (
    <ProfileInfoBox>
      <Form onSubmit={handleSubmit}>
        <FormInputsList>
          {inputs.map(({ name, type, isRequired = false }, i) =>
            type === 'checkbox' ? (
              <Checkbox
                key={i}
                isReadonly={!isAdmin}
                name={name}
                isRequired={isRequired}
                isChecked={Boolean(state[name as keyof typeof initialState])}
                handleCheck={handleChange}
              />
            ) : (
              <CustomFormInput
                isReadonly={!isAdmin}
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

        {isAdmin && (
          <ButtonBox>
            <Button
              isLoading={isLoading}
              Icon={IoIosSave}
              type="submit"
              disabled={
                JSON.stringify(initialState) === JSON.stringify(state) ||
                isLoading
              }
              $colors="accent"
            >
              Зберегти
            </Button>
          </ButtonBox>
        )}
      </Form>
    </ProfileInfoBox>
  );
};

export default ProfileInfo;
