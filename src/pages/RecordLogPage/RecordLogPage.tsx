import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import { SelectItem } from 'components/Ui/Form/types';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';

const RecordLogPage = () => {
  const { employees, workingHours } = useCompany();
  const providers = employees.filter(e => e.provider);
  const providersForSelect = providers.map(p => {
    return {
      id: p.id,
      value: p.lastName ? p.firstName + ' ' + p.lastName : p.firstName,
    };
  });
  const [date, setDate] = useState<Date>(new Date());

  const selectAll = {
    id: 'all',
    value: `Всі працівники: ${providersForSelect.length}`,
  };
  const initialSelection = [selectAll];

  const [selectedEmployees, setSelectedEmployees] =
    useState<SelectItem[]>(providersForSelect);

  const [selectedItem, setSelectedItem] =
    useState<SelectItem[]>(initialSelection);

  const handleSelect = (item: SelectItem) => {
    if (item.id === selectAll.id) {
      setSelectedItem(initialSelection);
      setSelectedEmployees(providersForSelect);
    } else {
      setSelectedItem(p => {
        const newState = p.filter(({ id }) => id !== selectAll.id);

        const itemIdx = newState.findIndex(({ id }) => id === item.id);

        return itemIdx === -1
          ? [...newState, item]
          : newState.filter(({ id }) => id !== item.id);
      });

      setSelectedEmployees(p => {
        if (
          selectedItem.length === 1 &&
          selectedItem.findIndex(({ id }) => id === selectAll.id) !== -1
        ) {
          return [item];
        } else {
          const itemIdx = p.findIndex(({ id }) => id === item.id);

          return itemIdx === -1
            ? [...p, item]
            : p.filter(({ id }) => id !== item.id);
        }
      });
    }
  };

  useEffect(() => {
    if (selectedItem.length === 0) {
      setSelectedItem(initialSelection);
      setSelectedEmployees(providersForSelect);
    }
  }, [selectedItem.length]);

  return (
    <PageContentLayout
      bar={
        <RecordLogBar
          date={date}
          selectItems={[selectAll, ...providersForSelect]}
          selected={selectedItem}
          setDate={setDate}
          handleSelect={handleSelect}
        />
      }
      content={
        <RecordLog
          date={date}
          workingHours={workingHours}
          employees={providers}
        />
      }
    />
  );
};

export default RecordLogPage;
