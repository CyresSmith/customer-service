import { useEffect, useState } from 'react';
import { ScheduleModalBox } from './SetScheduleModal.styled';
import SetWorkSchedule from './SetWorkSchedule';

export interface ITime {
  from: string;
  to: string;
}

export type Schedule = {
  id: number;
  days: number[];
  disabledDays?: number[];
  schedule: ITime;
};

const SetScheduleModal = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  console.log('🚀 ~ SetScheduleModal ~ schedules:', schedules);

  const addSchedule = () => {
    const disabledDays = schedules.reduce(
      (acc: number[], item) => [...acc, ...item.days],
      []
    );

    setSchedules(p => [
      ...p,
      {
        id: p.length + 1,
        days: [],
        disabledDays,
        schedule: { from: '', to: '' },
      },
    ]);
  };

  function updateDisabledDays(current: number[], newDays: number[]): number[] {
    const filteredArray = current.filter(day => !newDays.includes(day));

    const newArr = [
      ...filteredArray,
      ...newDays.filter(day => !current.includes(day)),
    ];
    console.log('🚀 ~ updateDisabledDays ~ newArr:', newArr);

    return newArr;
  }

  const updateSchedule = (schedule: Schedule) => {
    const arr = [...schedules];

    const idx = arr.findIndex(({ id }) => id === schedule.id);

    if (idx !== -1) {
      arr.splice(idx, 1, schedule);
    }

    setSchedules(
      arr.map(item => {
        if (item.id === schedule.id) {
          return item;
        } else {
          if (item.disabledDays) {
            return {
              ...item,
              disabledDays: updateDisabledDays(
                item.disabledDays,
                schedule.days
              ),
            };
          } else {
            return {
              ...item,
              disabledDays: schedule.days,
            };
          }
        }
      })
    );
  };

  const removeSchedule = (schedule: Schedule) => {
    const newSchedules = schedules.map(item => {
      if (item.id === schedule.id) {
        return item;
      } else {
        return {
          ...item,
          disabledDays: item.disabledDays?.filter(
            day => !schedule.days.includes(day)
          ),
        };
      }
    });

    console.log('🚀 ~ newSchedules ~ newSchedules:', newSchedules);

    setSchedules(newSchedules.filter(({ id }) => id !== schedule.id));
  };

  useEffect(() => {
    addSchedule();
  }, []);

  return (
    <ScheduleModalBox>
      {schedules.map(item => (
        <SetWorkSchedule
          key={item.id}
          currentSchedule={item}
          addSchedule={addSchedule}
          updateSchedule={updateSchedule}
          removeSchedule={removeSchedule}
          schedules={schedules}
          setSchedules={setSchedules}
        />
      ))}
    </ScheduleModalBox>
  );
};

export default SetScheduleModal;
