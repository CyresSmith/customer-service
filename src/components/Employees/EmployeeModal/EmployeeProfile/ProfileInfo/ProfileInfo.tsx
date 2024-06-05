import Button from 'components/Ui/Buttons/Button';
import { Form } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { InputProps, InputValueType } from 'components/Ui/Form/types';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useAdminRights, useAuth, useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useUserRole } from 'hooks/useUserRole';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useUpdateEmployeeProfileMutation } from 'services/employee.api';
import { EmployeeRoleEnum, IEmployee, UpdateEmployeeProfile } from 'services/types/employee.types';
import { ButtonBox, FormInputsList, ProfileInfoBox } from './ProfileInfo.styled';

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
    { name: 'isAdmin', type: 'checkbox' },
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
    const userRole = useUserRole();
    const { user: currentUser } = useAuth();
    const { id: companyId } = useCompany();

    const isOwner = role === EmployeeRoleEnum.OWNER;
    const isEditingAllowed = isAdmin || currentUser?.id === employee?.user?.id;

    const initialState: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        jobTitle: string;
        provider: boolean;
        info: string;
        birthday: Date;
        isAdmin?: boolean;
    } = {
        firstName: firstName || user.firstName || '',
        lastName: lastName || user.lastName || '',
        phone: phone || user.phone || '',
        email: email || user.email || '',
        jobTitle: role === EmployeeRoleEnum.OWNER ? 'Власник' : jobTitle || '',
        provider: provider || false,
        info: info || '',
        birthday: birthday || '',
        isAdmin: role === EmployeeRoleEnum.ADMIN,
    };

    if (isOwner) {
        delete initialState.isAdmin;
    }

    const [updateProfile, { isLoading }] = useUpdateEmployeeProfileMutation();

    const onSubmit = async (state: typeof initialState) => {
        const data: UpdateEmployeeProfile = {};

        Object.entries(state).map(([key, value]) => {
            if (value === '') return;

            if (key === 'isAdmin') {
                Object.assign(data, {
                    role: value ? EmployeeRoleEnum.ADMIN : EmployeeRoleEnum.EMPLOYEE,
                });
            }

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
                <FormInputsList $owner={isOwner}>
                    {(inputs as InputProps[]).map((item, i) => {
                        const isAdminField = item.name === 'isAdmin';

                        if (isOwner && isAdminField) return;

                        return (
                            <CustomFormInput
                                key={i}
                                {...item}
                                value={
                                    state[item.name as keyof typeof initialState] as InputValueType
                                }
                                handleChange={handleChange}
                                handlePickDate={handlePickDate}
                                isValid={getErrorMessage(item.name, invalidFields)}
                                isReadonly={
                                    !isEditingAllowed ||
                                    (isAdminField && userRole !== EmployeeRoleEnum.OWNER)
                                }
                                disabledIcon={true}
                            />
                        );
                    })}
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
