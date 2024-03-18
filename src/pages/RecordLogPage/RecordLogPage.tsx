import CreateEvent from 'components/CreateEvent';
import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import { SelectItem } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';

const RecordLogPage = () => {
  const { employees, workingHours } = useCompany();
  const providers = employees.filter(e => e.provider);
  const [eventStep, setEventStep] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  const handleEventStep = (step: string) => {
    setEventStep(step);
  };

  const closeEventModal = () => {
    setEventStep(null);
  };

  const providersForSelect = providers.map(p => {
    return {
      id: p.id,
      value: p.lastName ? p.firstName + ' ' + p.lastName : p.firstName,
    };
  });

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

  const filteredProvidersList =
    selectedItem[0]?.id !== 'all'
      ? providers.filter(p => selectedItem.find(s => s.id === p.id))
      : providers;

  return (
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
