import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import { SelectItem } from 'components/Ui/Form/types';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';

const initialSelect: SelectItem[] = [{id: 'all', value: 'Вибрати всіх'}]

const RecordLogPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEmployees, setSelectedEmployees] = useState<SelectItem[]>(initialSelect);
  const { employees, workingHours } = useCompany();

  const providers = employees.filter(e => e.provider);
  const providersForSelect = providers.map(p => {
    return { id: p.id, value: p.lastName ? p.firstName + ' ' + p.lastName : p.firstName };
  });

  const handleSelect = (item: SelectItem) => {
    if (item.id === 'all') {
      setSelectedEmployees(initialSelect);
    } else if (selectedEmployees.find(s => s.id === item.id)) {
      setSelectedEmployees(s => s.filter(i => i.id !== item.id));
    } else {
      setSelectedEmployees(s => [...s.filter(i => i.id !== 'all'), item]);
    }
  }

  return (
    <PageContentLayout
      bar={
        <RecordLogBar
          date={date}
          selectItems={[...initialSelect, ...providersForSelect]}
          selected={selectedEmployees}
          setDate={setDate}
          handleSelect={handleSelect}
        />}
      content={
        <RecordLog
          date={date}
          workingHours={workingHours}
          employees={providers}
        />}
    />
  );
};

export default RecordLogPage;
