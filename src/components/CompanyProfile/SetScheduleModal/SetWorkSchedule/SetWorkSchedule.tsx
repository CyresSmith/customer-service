import Button from 'components/Ui/Buttons/Button';
import Select from 'components/Ui/Select';
import { weekDays } from 'helpers/constants';
import generateTimeArray from 'helpers/generateTimeArray';
import translateWorkSchedule from 'helpers/translateWorkSchedule';
import { useEffect, useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { DayList, Time, WeekBox } from './SetWorkSchedule.styled';
import { ICompanySchedule } from '../SetScheduleModal';

type Props = {
  addSchedule: () => void;
  updateSchedule: (schedule: ICompanySchedule) => void;
  removeSchedule: (schedule: ICompanySchedule) => void;
  addDisabled: boolean;
  currentSchedule: ICompanySchedule;
  schedules: ICompanySchedule[];
};

const SetWorkSchedule = ({
  addSchedule,
  updateSchedule,
  removeSchedule,
  currentSchedule,
  schedules,
  addDisabled,
}: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const handleDaySelect = (id: number) =>
    setSelected(p => (p?.includes(id) ? p?.filter(d => d !== id) : [...p, id]));

  useEffect(() => {
    if (currentSchedule.days.length > 0) {
      setSelected(currentSchedule?.days);
      setFrom(currentSchedule?.hours?.from);
      setTo(currentSchedule?.hours?.to);
    }
  }, [
    currentSchedule?.days,
    currentSchedule?.hours?.from,
    currentSchedule?.hours?.to,
  ]);

  useEffect(() => {
    const newSchedule = {
      ...currentSchedule,
      days: selected,
      hours: { from, to },
    };

    updateSchedule(newSchedule);
  }, [from, selected, to]);

  return (
    <WeekBox>
      <DayList>
        {weekDays.map(({ name, id }) => (
          <li key={id}>
            <Button
              disabled={currentSchedule.disabledDays?.includes(id)}
              $colors={selected?.includes(id) ? 'accent' : 'light'}
              onClick={() => handleDaySelect(id)}
            >
              {name}
            </Button>
          </li>
        ))}
      </DayList>

      <Time>
        <span>{translateWorkSchedule('from')}</span>

        <Select
          selectedItem={from}
          onSelect={item => setFrom(item)}
          $colors="light"
          items={generateTimeArray()}
        />
      </Time>

      <Time>
        <span>{translateWorkSchedule('to')}</span>

        <Select
          selectedItem={to}
          onSelect={item => setTo(item)}
          $colors="light"
          items={generateTimeArray()}
        />
      </Time>

      <Button
        disabled={
          (currentSchedule.id === 1 && schedules.length === 7) ||
          (currentSchedule.id === 1 && addDisabled) ||
          (currentSchedule.id === 1 && !selected.length && !from && !to)
        }
        onClick={() => {
          currentSchedule.id === 1
            ? addSchedule()
            : removeSchedule(currentSchedule);
        }}
        Icon={currentSchedule.id > 1 ? HiMinusCircle : HiPlusCircle}
        $variant="text"
        $round
        size="l"
      />
    </WeekBox>
  );
};

export default SetWorkSchedule;
