import Avatar from 'components/Avatar';
import { useAdminRights } from 'hooks';

type Props = { employeeId: string };

const EmployeeProfile = ({ employeeId }: Props) => {
  const handleUpload = (file: File) => {
    console.log(file);
  };

  const isAdmin = useAdminRights();

  return (
    <div>
      <Avatar
        allowChanges={isAdmin}
        size={250}
        alt="employee image"
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default EmployeeProfile;
