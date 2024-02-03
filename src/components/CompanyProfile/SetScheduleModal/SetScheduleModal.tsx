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

  const updateSchedule = (schedule: Schedule) => {
    const arr = [...schedules];

    const idx = arr.findIndex(({ id }) => id === schedule.id);

    const prevDays = arr.find(({ id }) => id === schedule.id)?.days;

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
              disabledDays: [
                ...item.disabledDays.filter(day => !prevDays?.includes(day)),
                ...schedule.days,
              ],
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

    setSchedules(newSchedules.filter(({ id }) => id !== schedule.id));
  };

  const addDisabled = Boolean(
    schedules.reduce((acc: number[], item) => {
      item.days.map(day => {
        if (acc.includes(day)) {
          return;
        } else {
          acc.push(day);
        }
      });

      return acc;
    }, []).length === 7 ||
      schedules.find(
        ({ schedule }) => schedule.from === '' || schedule.to === ''
      )
  );

  useEffect(() => {
    addSchedule();
  }, []);

  useEffect(() => {
    const scheduleToRemove = schedules.find(
      ({ disabledDays }) => disabledDays?.length === 7
    );

    if (scheduleToRemove) {
      setSchedules(p => p.filter(({ id }) => id !== scheduleToRemove.id));
    }
  }, [schedules]);

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
          addDisabled={addDisabled}
        />
      ))}
    </ScheduleModalBox>
  );
};

export default SetScheduleModal;
