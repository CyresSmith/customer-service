import Loader from 'components/Ui/Loader';
import PageContentLayout from 'components/Ui/PageContentLayout';
import WorkSchedule from 'components/WorkSchedule';
import WorkScheduleBar from 'components/WorkSchedule/WorkScheduleBar';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { EmployeeStatusEnum } from 'services/types/employee.types';

const WorkSchedulePage = () => {
  const { employees } = useCompany();
  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date(Date.now()));

  const providers = employees.filter(
    ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
  );

  const providersForRender = providers.filter(({ id }) =>
    selectedProviders.includes(id)
  );

  useEffect(() => {
    if (!employees) return;

    setSelectedProviders(providers.map(({ id }) => id));
  }, [employees]);

  return (
    <PageContentLayout
      bar={
        <WorkScheduleBar
          setSelectedProviders={setSelectedProviders}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      }
      content={
        providersForRender.length > 1 ? (
          <WorkSchedule
            selectedMonth={selectedMonth}
            providers={providersForRender}
          />
        ) : (
          <Loader />
        )
      }
    />
  );
};

export default WorkSchedulePage;
