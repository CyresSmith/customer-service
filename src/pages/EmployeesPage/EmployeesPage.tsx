import AddEmployeeModal from 'components/Employees/AddEmployeeModal';
import EmployeeModal from 'components/Employees/EmployeeModal';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import ItemsList from 'components/Ui/ItemsList';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteEmployeeMutation, useGetCompanyEmployeesQuery } from 'services/employee.api';

enum OpenModal {
    ADD = 1,
    EDIT = 2,
    DELETE = 3,
}

const EmployeesPage = () => {
    const { id: companyId } = useCompany();
    const { accessToken } = useAuth();
    const isAdmin = useAdminRights();

    const [openModal, setOpenModal] = useState<OpenModal | null>(null);
    const [employeeId, setEmployeeId] = useState<number | null>(null);

    const [deleteEmployee, { isLoading: isEmployeeDeleteLoading }] = useDeleteEmployeeMutation();

    const handleItemClick = (employeeId: number) => {
        setEmployeeId(employeeId);
        setOpenModal(OpenModal.EDIT);
    };

    const handleEmployeeDeleteModalOpen = async (employeeId: number) => {
        setEmployeeId(employeeId);
        setOpenModal(OpenModal.DELETE);
    };

    const handleEmployeeDelete = async () => {
        if (!employeeId) return;

        const { message } = await deleteEmployee({ companyId, employeeId }).unwrap();

        if (message) {
            setOpenModal(null);
            setEmployeeId(null);
            toast.success(message);
        }
    };

    const { data, isLoading } = useGetCompanyEmployeesQuery(+companyId, {
        skip: !companyId || !accessToken,
        refetchOnMountOrArgChange: true,
    });

    const selectedEmployee = data && data.find(({ id }) => id === employeeId);

    return !isLoading && data && data.length > 0 ? (
        <>
            <ItemsList
                items={data.map(
                    ({ firstName, lastName, servicesCount, id, avatar, jobTitle, status }) => ({
                        id,
                        avatar,
                        name: `${firstName} ${lastName}`,
                        jobTitle: jobTitle || 'Власник',
                        servicesCount: servicesCount || 0,
                        status,
                    })
                )}
                keyForSelect="jobTitle"
                onItemClick={handleItemClick}
                addButtonTitle="Додати співробітника"
                onAddClick={() => setOpenModal(OpenModal.ADD)}
                isDeleteLoading={isEmployeeDeleteLoading}
                onItemDeleteClick={isAdmin ? handleEmployeeDeleteModalOpen : undefined}
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

            {openModal === OpenModal.DELETE && employeeId && (
                <ConfirmOperation
                    id="deleteEmployeeModal"
                    callback={handleEmployeeDelete}
                    closeConfirm={() => setOpenModal(null)}
                    isOpen={openModal === OpenModal.DELETE}
                >
                    Ви дійсно бажаєте видалити {selectedEmployee?.firstName}{' '}
                    {selectedEmployee?.lastName}
                </ConfirmOperation>
            )}
        </>
    ) : (
        <Loader />
    );
};

export default EmployeesPage;
