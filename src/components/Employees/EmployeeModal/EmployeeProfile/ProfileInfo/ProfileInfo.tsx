import Button from 'components/Ui/Buttons/Button';
import { Form } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { InputProps } from 'components/Ui/Form/types';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useAdminRights, useAuth, useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { IoIosSave } from 'react-icons/io';
import { useUpdateEmployeeProfileMutation } from 'services/employee.api';
import { EmployeeRoleEnum, IEmployee, UpdateEmployeeProfile } from 'services/types/employee.types';
import { ButtonBox, FormInputsList, ProfileInfoBox } from './ProfileInfo.styled';
import { toast } from 'react-toastify';

type Props = { employee: IEmployee };

const inputs: Partial<InputProps>[] = [
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
    const { user: currentUser } = useAuth();
    const { id: companyId } = useCompany();

    const isEditingAllowed = isAdmin || currentUser?.id === employee?.user?.id;

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

    const onSubmit = async (state: typeof initialState) => {
        const data: UpdateEmployeeProfile = {};

        Object.entries(state).map(([key, value]) => {
            if (value === '') return;

            Object.assign(data, { [key]: value });
        });

        const updatedEmployee = await updateProfile({
            companyId,
            employeeId,
            data,
        }).unwrap();

        if (updatedEmployee.id) {
            toast.success('Профіль оновлено');
        }
    };

    const { state, handleChange, handleSubmit, invalidFields, setState } = useForm<
        typeof initialState
    >(initialState, onSubmit);

    const handlePickDate = (date: Date) => {
        setState({ ...state, birthday: date });
    };

    return (
        <ProfileInfoBox>
            <Form onSubmit={handleSubmit}>
                <FormInputsList>
                    {(inputs as InputProps[]).map((item, i) => (
                        <CustomFormInput
                            key={i}
                            {...item}
                            value={state[item.name as keyof typeof initialState]}
                            handleChange={handleChange}
                            handlePickDate={handlePickDate}
                            isValid={getErrorMessage(item.name, invalidFields)}
                            isReadonly={!isEditingAllowed}
                        />
                    ))}
                </FormInputsList>

                {isEditingAllowed && (
                    <ButtonBox>
                        <Button
                            isLoading={isLoading}
                            Icon={IoIosSave}
                            type="submit"
                            disabled={
                                JSON.stringify(initialState) === JSON.stringify(state) || isLoading
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
