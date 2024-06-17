import Avatar from 'components/Avatar';
import { useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { MouseEvent } from 'react';
import { toast } from 'react-toastify';
import {
    useUpdateEmployeeProfileMutation,
    useUploadEmployeeAvatarMutation,
} from 'services/employee.api';
import { EmployeeRoleEnum, EmployeeStatusEnum, IEmployee } from 'services/types/employee.types';
import { AvatarBox, ProfileBox, Status, StatusBadge, StatusItem } from './EmployeeProfile.styled';
import ProfileInfo from './ProfileInfo';

type Props = { employee: IEmployee };

const EmployeeProfile = ({ employee }: Props) => {
    const { avatar, user, status, id: employeeId, role } = employee;
    const isAdmin = useAdminRights();
    const { id: companyId } = useCompany();
    const [uploadImg, { isLoading }] = useUploadEmployeeAvatarMutation();
    const [updateProfile] = useUpdateEmployeeProfileMutation();

    const handleUpload = async (file: File) => {
        const data = new FormData();
        data.append('avatar', file);

        const { url } = await uploadImg({
            companyId,
            employeeId: employee.id,
            data,
        }).unwrap();

        if (url) {
            toast.success('Профіль оновлено');
        }
    };

    const onStatusChange = async (status: EmployeeStatusEnum) => {
        if (!isAdmin) return;

        const data = { status };

        const updatedEmployee = await updateProfile({
            companyId,
            employeeId,
            data,
        }).unwrap();

        if (updatedEmployee.id) {
            toast.success('Профіль оновлено');
        }
    };

    const handleStatusChange = (e: MouseEvent<HTMLButtonElement>) => {
        const id = (e.target as HTMLButtonElement).id;
        onStatusChange(id as EmployeeStatusEnum);
    };

    return (
        <ProfileBox>
            <AvatarBox>
                <Avatar
                    currentImageUrl={avatar || user.avatar || ''}
                    isLoading={isLoading}
                    allowChanges={isAdmin}
                    alt="employee image"
                    handleUpload={handleUpload}
                />

                {role !== EmployeeRoleEnum.OWNER &&
                    (!isAdmin ? (
                        <StatusBadge $active={status === EmployeeStatusEnum.WORKING} $size="s">
                            {status === EmployeeStatusEnum.WORKING && <span>Працює</span>}
                            {status === EmployeeStatusEnum.FIRED && <span>Звільнено</span>}
                        </StatusBadge>
                    ) : (
                        <Status>
                            <StatusItem $active={status === EmployeeStatusEnum.WORKING}>
                                <button
                                    id={EmployeeStatusEnum.WORKING}
                                    onClick={handleStatusChange}
                                >
                                    Працює
                                </button>
                            </StatusItem>
                            <StatusItem $active={status === EmployeeStatusEnum.FIRED}>
                                <button id={EmployeeStatusEnum.FIRED} onClick={handleStatusChange}>
                                    Звільнено
                                </button>
                            </StatusItem>
                        </Status>
                    ))}
            </AvatarBox>

            <ProfileInfo employee={employee} />
        </ProfileBox>
    );
};

export default EmployeeProfile;
