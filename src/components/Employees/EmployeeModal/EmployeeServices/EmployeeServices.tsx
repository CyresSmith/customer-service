import { SelectItem } from 'components/Ui/Form/types';
import ItemsList from 'components/Ui/ItemsList';
import {
  hoursToMilliseconds,
  millisecondsToHours,
  millisecondsToMinutes,
} from 'date-fns';
import { ServiceOpenModal } from 'helpers/enums';
import { useState } from 'react';
import { IEmployee } from 'services/types/employee.types';
import EditEmployeeServiceModal from './EditEmployeeServiceModal/EditEmployeeServiceModal';
import { EmployeeServicesBox } from './EmployeeServices.styled';

type Props = {
  employee: IEmployee;
};

type ServiceState = {
  durationHours: SelectItem;
  durationMinutes: SelectItem;
  price: number;
};

const EmployeeServices = ({ employee }: Props) => {
  const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);
  const [serviceState, setServiceState] = useState<ServiceState | null>(null);

  const handleModalOpen = (
    type: ServiceOpenModal | null,
    serviceId?: number
  ) => {
    if (!serviceId) return;

    const service = employee.services.find(({ id }) => id === serviceId);

    if (service) {
      const employeeSetting = service.employeesSettings?.find(
        setting => setting.employeeId === +employee.id
      );

      const hours =
        employeeSetting && employeeSetting.duration
          ? millisecondsToHours(employeeSetting.duration)
          : service?.duration
          ? millisecondsToHours(service?.duration)
          : 0;

      const minutes =
        employeeSetting && employeeSetting.duration
          ? millisecondsToMinutes(
              employeeSetting?.duration - hoursToMilliseconds(hours)
            )
          : service?.duration
          ? millisecondsToMinutes(
              service?.duration - hoursToMilliseconds(hours)
            )
          : 0;

      const serviceState = {
        durationHours: { id: hours, value: `${hours} г.` },
        durationMinutes: { id: minutes, value: `${minutes} хв.` },
        price: employeeSetting?.price || service.price || 0,
      };

      setServiceState(serviceState);

      setOpenModal(type);
    }
  };

  const handleModalClose = () => {
    setServiceState(null);
    setOpenModal(null);
  };

  return (
    <EmployeeServicesBox>
      <ItemsList
        items={employee.services.map(
          ({
            id = '',
            avatar = '',
            name = '',
            category,
            type = '',
            duration = 0,
            price = 0,
            employeesSettings,
          }) => ({
            id,
            avatar,
            name,
            category: category?.name || '',
            type: type === 'individual' ? 'Індівідуальна' : 'Групова',
            duration:
              (employeesSettings &&
                employeesSettings.length > 0 &&
                employeesSettings.find(
                  setting => setting.employeeId === +employee.id
                )?.duration) ||
              duration,
            price:
              (employeesSettings &&
                employeesSettings.length > 0 &&
                employeesSettings.find(
                  setting => setting.employeeId === +employee.id
                )?.price) ||
              price,
          })
        )}
        keyForSelect="category"
        onItemClick={id => handleModalOpen(ServiceOpenModal.EDIT_SERVICE, +id)}
        addButtonTitle={employee.provider ? 'Додати послугу' : undefined}
        onAddClick={
          employee.provider
            ? () => handleModalOpen(ServiceOpenModal.ADD)
            : undefined
        }
        onItemDeleteClick={id => console.log(id)}
      />

      {openModal === ServiceOpenModal.EDIT_SERVICE && serviceState && (
        // <ServiceModal
        //   categories={categories}
        //   openModal={openModal}
        //   serviceId={serviceId}
        //   handleModalClose={handleModalClose}
        //   refetchCategories={() => refetchCategories()}
        // />

        <EditEmployeeServiceModal
          openModal={openModal === ServiceOpenModal.EDIT_SERVICE}
          handleModalClose={handleModalClose}
          serviceState={serviceState}
        />
      )}
    </EmployeeServicesBox>
  );
};

export default EmployeeServices;
