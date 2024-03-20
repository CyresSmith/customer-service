import Avatar from 'components/Avatar';
import { useActions, useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { MouseEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  useUpdateEmployeeProfileMutation,
  useUploadEmployeeAvatarMutation,
} from 'services/employee.api';
import {
  EmployeeRoleEnum,
  EmployeeStatusEnum,
  IEmployee,
} from 'services/types/employee.types';
import {
  AvatarBox,
  ProfileBox,
  Status,
  StatusBadge,
  StatusItem,
} from './EmployeeProfile.styled';
import ProfileInfo from './ProfileInfo';

type Props = { employee: IEmployee };

const EmployeeProfile = ({ employee }: Props) => {
  const { avatar, user, status, id: employeeId, role } = employee;
  const isAdmin = useAdminRights();
  const { id: companyId, employees } = useCompany();
  const { updateCompanyData } = useActions();
  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const [uploadImg, { isLoading }] = useUploadEmployeeAvatarMutation();

  const [updateProfile, { isLoading: isStatusLoading }] =
    useUpdateEmployeeProfileMutation();

  const handleUpload = async (file: File) => {
    const data = new FormData();
    data.append('avatar', file);

    const { url } = await uploadImg({
      companyId,
      employeeId: employee.id,
      data,
    }).unwrap();

    if (url) {
      updateCompanyData({
        employees: employees.map(item =>
          item.id === employee.id ? { ...item, avatar: url } : item
        ),
      });
      refetchCompanyData();
    }
  };

  const onStatusChange = async (status: EmployeeStatusEnum) => {
    if (!isAdmin) return;

    const data = { status };

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

  const handleStatusChange = (e: MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLButtonElement).id;
    onStatusChange(id as EmployeeStatusEnum);
  };

  return (
    <ProfileBox>
      <AvatarBox>
        <Avatar
          currentImageUrl={avatar || user.avatar}
          isLoading={isLoading}
          allowChanges={isAdmin}
          size={250}
          alt="employee image"
          handleUpload={handleUpload}
        />

        {role !== EmployeeRoleEnum.OWNER &&
          (!isAdmin ? (
            <StatusBadge $active={status === EmployeeStatusEnum.WORKING}>
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
                <button
                  id={EmployeeStatusEnum.FIRED}
                  onClick={handleStatusChange}
                >
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