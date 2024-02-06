import Button from 'components/Ui/Buttons/Button';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useCallback, useEffect, useState } from 'react';
import { HiCalendar } from 'react-icons/hi';
import { useUpdateCompanyProfileMutation } from 'services/company.api';
import { IWorkingHours } from 'store/company/company.types';
import { ButtonBox, ScheduleModalBox } from './SetScheduleModal.styled';
import SetWorkSchedule from './SetWorkSchedule';

export interface ITime {
  from: string;
  to: string;
}

export interface ISchedule {
  id: number;
  days: number[];
  disabledDays?: number[];
  schedule: ITime;
}

type Props = {
  closeModal: () => void;
};

const SetScheduleModal = ({ closeModal }: Props) => {
  const { id, workingHours } = useCompany();
  const { setCompanySchedule } = useActions();

  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  const [uploadWorkingHours, { isLoading }] = useUpdateCompanyProfileMutation();

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

  const updateSchedule = (
    schedule: ISchedule,
    schedulesArr: ISchedule[]
  ): ISchedule[] => {
    const arr = [...schedulesArr];

    const idx = arr.findIndex(({ id }) => id === schedule.id);

    const prevDays = arr.find(({ id }) => id === schedule.id)?.days;

    if (idx !== -1) {
      arr.splice(idx, 1, schedule);
    }

    return arr.map(item => {
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
    });
  };

  const handleSchedulesStateUpdate = (schedule: ISchedule) =>
    setSchedules(updateSchedule(schedule, schedules));

  const removeSchedule = (schedule: ISchedule) => {
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

  const isAllDaysDisabled = Boolean(
    schedules.reduce((acc: number, item) => {
      return acc + item.days.length;
    }, 0) === 7
  );

  const isTimeNotSelected = Boolean(
    schedules.find(({ schedule }) => schedule.from === '' || schedule.to === '')
  );

  const isDaysNotSelected = Boolean(
    schedules.find(({ days }) => days.length === 0)
  );

  const getWorkingHours = useCallback((): IWorkingHours[] => {
    return schedules
      .filter(({ schedule }) => schedule.from !== '' || schedule.to !== '')
      .map(({ days, schedule }) => ({
        days: [...days].sort((a, b) => a - b),
        schedule,
      }));
  }, [schedules]);

  const handleScheduleUpdate = async () => {
    const workingHours = getWorkingHours();

    if (workingHours) {
      const { message } = await uploadWorkingHours({
        id,
        data: { workingHours },
      }).unwrap();

      if (message) {
        setCompanySchedule({ workingHours });
      }

      closeModal();
    }
  };

  useEffect(() => {
    if (workingHours && workingHours.length > 0) {
      setSchedules(
        workingHours.map(({ days, schedule }, idx) => {
          const disabledDays = workingHours.reduce(
            (acc: number[], { days }, i) => {
              return idx === i ? acc : [...acc, ...days];
            },
            []
          );

          return {
            id: idx + 1,
            days,
            schedule,
            disabledDays,
          };
        })
      );
    } else {
      addSchedule();
    }
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
          updateSchedule={handleSchedulesStateUpdate}
          removeSchedule={removeSchedule}
          schedules={schedules}
          addDisabled={isAllDaysDisabled || isTimeNotSelected}
        />
      ))}

      <ButtonBox>
        <Button
          isLoading={isLoading}
          onClick={handleScheduleUpdate}
          disabled={isDaysNotSelected || isTimeNotSelected}
          Icon={HiCalendar}
        >
          Оновити графік
        </Button>
      </ButtonBox>
    </ScheduleModalBox>
  );
};

export default SetScheduleModal;
