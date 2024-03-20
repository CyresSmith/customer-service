import { SelectItem } from 'components/Ui/Form/types';
import {
  hoursToMilliseconds,
  millisecondsToHours,
  millisecondsToMinutes,
} from 'date-fns';
import { useEffect, useState } from 'react';
import { IService } from 'services/types/service.type';

type Props = {
  employeeId: string;
  services: Partial<IService>[];
};

type ServiceState = {
  id: number;
  avatar: string;
  name: string;
  category: SelectItem;
  durationHours: SelectItem;
  durationMinutes: SelectItem;
  price: number | undefined;
};

const EmployeeServices = ({ employeeId, services }: Props) => {
  const [servicesState, setServicesState] = useState<ServiceState[]>([]);

  console.log('🚀 ~ EmployeeServices ~ services:', services);
  console.log('🚀 ~ EmployeeServices ~ servicesState:', servicesState);

  useEffect(() => {
    if (!services) return;

    if (services && services.length > 0) {
      const state = services.map(service => {
        const employeeSetting = service.employeesSettings?.find(
          setting => setting.employeeId === +employeeId
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
          //   category: service?.category
          //     ? { id: service?.category.id, value: service?.category.name }
          //     : null,
          durationHours: { id: hours, value: `${hours} год` },
          durationMinutes: { id: minutes, value: `${minutes} хв` },
          //   break: service.break ? service.break > 0 : false,
          //   capacityLimit: service?.capacity ? service?.capacity > 1 : false,
          //   capacity: service.capacity,
          //   placesLimit: Boolean(service.placeLimit),
          //   placeLimit: service.placeLimit,
          price:
            employeeSetting && employeeSetting.price
              ? employeeSetting.price
              : service.price,
        };

        // if (service.break && service.break > 0) {
        //   const minutes = millisecondsToMinutes(service.break);

        //   serviceState = Object.assign(serviceState, {
        //     breakDuration: {
        //       id: minutes,
        //       value: `${minutes} хв`,
        //     },
        //   });
        // }

        return serviceState;
      });

      setServicesState(state);
    }
  }, [services]);

  return <div>EmployeeServices</div>;
};

export default EmployeeServices;
