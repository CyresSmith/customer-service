import AddEmployeeModal from 'components/Employees/AddEmployeeModal';
import EmployeeModal from 'components/Employees/EmployeeModal';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import { useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';

enum OpenModal {
  ADD = 1,
  EDIT = 2,
}

const EmployeesPage = () => {
  const { id: companyId } = useCompany();
  const { accessToken } = useAuth();

  const [openModal, setOpenModal] = useState<OpenModal | null>(null);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  // const [allEmployees, setAllEmployees] = useState<BasicEmployeeInfo[]>([]);

  const handleItemClick = (employeeId: number) => {
    setEmployeeId(employeeId);
    setOpenModal(OpenModal.EDIT);
  };

  const { data, isLoading } = useGetCompanyEmployeesQuery(
    +companyId,
    {
      skip: !companyId || !accessToken,
      refetchOnMountOrArgChange: true,
    }
  );

  // useEffect(() => {
  //   if (isSuccess && data) {
  //     setAllEmployees(data);
  //   }
  // }, [data, isSuccess, setAllEmployees]);

  return !isLoading && data && data.length > 0 ? (
    <>
      <ItemsList
        items={data.map(
          ({
            firstName,
            lastName,
            servicesCount,
            id,
            avatar,
            jobTitle,
            status,
          }) => ({
            id,
            avatar,
            name: `${firstName} ${lastName}`,
            jobTitle,
            servicesCount: servicesCount || 0,
            status,
          })
        )}
        keyForSelect="jobTitle"
        onItemClick={handleItemClick}
        addButtonTitle="Додати співробітника"
        onAddClick={() => setOpenModal(OpenModal.ADD)}
      />

      {openModal === OpenModal.ADD && (
        <AddEmployeeModal
          isOpen={openModal === OpenModal.ADD}
          closeModal={() => setOpenModal(null)}
        />
      )}

      {openModal === OpenModal.EDIT && employeeId && (
        <Modal
          id="editEmployeeModal"
          $isOpen={openModal === OpenModal.EDIT}
          closeModal={() => setOpenModal(null)}
        >
          <EmployeeModal id={employeeId} />
        </Modal>
      )}
    </>
  ) : (
    <Loader />
  );
};

export default EmployeesPage;
