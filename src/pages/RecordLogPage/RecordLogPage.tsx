import CreateEvent from 'components/CreateEvent';
import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import { SelectItem } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useEmployees } from 'hooks/useEmployees';
import { useEffect, useState } from 'react';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';

const RecordLogPage = () => {
  const { allEmployees } = useEmployees();
  const { workingHours, id } = useCompany();
  const { setAllEmployees } = useActions();
  const [eventStep, setEventStep] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  const { data: freshAllEmployees, isSuccess: successGetEmployees } = useGetCompanyEmployeesQuery(+id, {
    skip: !id,
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (freshAllEmployees && successGetEmployees) {
      setAllEmployees(freshAllEmployees);
    }
  }, [freshAllEmployees, setAllEmployees, successGetEmployees]);

  const providers = allEmployees?.filter(e => e.provider);

  const providersForSelect = providers.map(p => {
    return {
      id: p.id,
      value: p.lastName ? p.firstName + ' ' + p.lastName : p.firstName,
    };
  });

  console.log(providersForSelect.length)

  const selectAll = {
    id: 'all',
    value: `Всі працівники: ${providersForSelect.length}`,
  };

  const initialSelection = [selectAll];

  const [selectedItem, setSelectedItem] = useState<SelectItem[]>(initialSelection);

  const handleSelect = (item: SelectItem) => {
    if (item.id === selectAll.id) {
      setSelectedItem(initialSelection);
    } else {
      setSelectedItem(p => {
        const newState = p.filter(({ id }) => id !== selectAll.id);

        const itemIdx = newState.findIndex(({ id }) => id === item.id);

        return itemIdx === -1
          ? [...newState, item]
          : newState.filter(({ id }) => id !== item.id);
      });
    }
  };

  const handleEventStep = (step: string) => {
    setEventStep(step);
  };

  const closeEventModal = () => {
    setEventStep(null);
  };

  const filteredProvidersList =
    selectedItem[0]?.id !== 'all'
      ? providers.filter(p => selectedItem.find(s => s.id === p.id))
      : providers;

  return successGetEmployees && (
    <>
      <PageContentLayout
        bar={
          <RecordLogBar
            date={date}
            selectItems={[selectAll, ...providersForSelect]}
            selected={selectedItem}
            setDate={setDate}
            handleSelect={handleSelect}
            openEventModal={handleEventStep}
          />
        }
        content={
          <RecordLog
            date={date}
            setDate={setDate}
            workingHours={workingHours}
            employees={filteredProvidersList}
          />
        }
      />
      {eventStep !== null && 
        <Modal
          titleMargin='10px'
          closeModal={closeEventModal}
          $isOpen={eventStep !== null}
          title={eventStep === 'employees' ?
            'Оберіть працівника' :
            eventStep === 'services' ?
            'Оберіть послугу' :
            eventStep === 'date' ?
            'Оберіть дату та час' :
            'Створення запису'
          }
          children={
            <CreateEvent
              step={eventStep}
              handleEventStep={handleEventStep}
            />
          }
        />
      }
    </>
  );
};

export default RecordLogPage;
