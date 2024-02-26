import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';

const RecordLogPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<number | undefined>(undefined);
  const { employees, workingHours } = useCompany();

  const providers = employees.filter(e => e.provider);
  console.log(providers.map(p => p.lastName ? p.firstName + ' ' + p.lastName : p.firstName));

  return (
    <PageContentLayout
      bar={<RecordLogBar date={date} setDate={setDate} employees={providers} />}
      content={<RecordLog date={date} workingHours={workingHours} employees={providers} />}
    />
  );
};

export default RecordLogPage;
