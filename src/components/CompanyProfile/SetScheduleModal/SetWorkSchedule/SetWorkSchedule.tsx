import Button from 'components/Ui/Buttons/Button';
import Select from 'components/Ui/Select';
import translateWorkSchedule from 'helpers/translateWorkSchedule';
import { useEffect, useMemo, useState } from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { ISchedule } from '../SetScheduleModal';
import { DayList, Time, WeekBox } from './SetWorkSchedule.styled';

type DayId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Props = {
  addSchedule: () => void;
  updateSchedule: (schedule: ISchedule) => void;
  removeSchedule: (schedule: ISchedule) => void;
  addDisabled: boolean;
  currentSchedule: ISchedule;
  schedules: ISchedule[];
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

  const handleDaySelect = (id: DayId) =>
    setSelected(p => (p?.includes(id) ? p?.filter(d => d !== id) : [...p, id]));

  useEffect(() => {
    if (currentSchedule.days.length > 0) {
      setSelected(currentSchedule.days);
      setFrom(currentSchedule.schedule.from);
      setTo(currentSchedule.schedule.to);
    }
  }, [
    currentSchedule.days,
    currentSchedule.schedule.from,
    currentSchedule.schedule.to,
  ]);

  useEffect(() => {
    const newSchedule = {
      ...currentSchedule,
      days: selected,
      schedule: { from, to },
    };

    updateSchedule(newSchedule);
  }, [from, selected, to]);

  const generateTimeArray = useMemo(() => {
    const times = [];
    for (let hours = 0; hours <= 24; hours++) {
      if (hours === 24) {
        times.push('24:00');
      } else {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const formattedHours = String(hours).padStart(2, '0');
          const formattedMinutes = String(minutes).padStart(2, '0');
          times.push(`${formattedHours}:${formattedMinutes}`);
        }
      }
    }
    return times;
  }, []);

  return (
    <WeekBox>
      <DayList>
        {Array.from({ length: 7 }, (_, i) => i + 1).map(i => (
          <li key={i}>
            <Button
              disabled={currentSchedule.disabledDays?.includes(i)}
              $colors={selected?.includes(i as DayId) ? 'accent' : 'light'}
              onClick={() => handleDaySelect(i as DayId)}
            >
              {translateWorkSchedule(i)}
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
          items={generateTimeArray}
        />
      </Time>

      <Time>
        <span>{translateWorkSchedule('to')}</span>

        <Select
          selectedItem={to}
          onSelect={item => setTo(item)}
          $colors="light"
          items={generateTimeArray}
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
