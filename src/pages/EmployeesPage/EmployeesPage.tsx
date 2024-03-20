import AddEmployeeModal from 'components/Employees/AddEmployeeModal';
import EmployeeModal from 'components/Employees/EmployeeModal';
import ItemsList from 'components/Ui/ItemsList';
import Modal from 'components/Ui/Modal/Modal';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { IEmployee } from 'services/types/employee.types';

enum OpenModal {
  ADD = 1,
  EDIT = 2,
}

const EmployeesPage = () => {
  const { employees } = useCompany();
  const [openModal, setOpenModal] = useState<OpenModal | null>(null);
  const [employee, setEmployee] = useState<IEmployee | null>(null);

  const handleItemClick = (employeeId: string | number) => {
    const employee = employees.find(({ id }) => id === employeeId);

    if (employee) {
      setOpenModal(OpenModal.EDIT);
      setEmployee(employee);
    }
  };

  return (
    <>
      <ItemsList
        items={employees.map(
          ({
            id,
            avatar,
            firstName,
            lastName,
            status,
            jobTitle,
            services,
            user,
          }) => ({
            id,
            avatar,
            name:
              firstName && lastName
                ? lastName
                  ? firstName + ' ' + lastName
                  : firstName
                : user.lastName
                ? user.firstName + ' ' + user.lastName
                : user.firstName,
            jobTitle,
            servicesCount: services.length,
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

      {openModal === OpenModal.EDIT && employee && (
        <Modal
          $isOpen={openModal === OpenModal.EDIT}
          closeModal={() => setOpenModal(null)}
        >
          <EmployeeModal employee={employee} />
        </Modal>
      )}
    </>
  );
};

export default EmployeesPage;
