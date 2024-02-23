import { useCompany } from 'hooks/useCompany';
import { RecordContainer } from './RecordLog.styled';
import HoursList from './RecordLogList/HoursList';
import RecordLogList from './RecordLogList/RecordLogList';

const dayHours: string[] = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const RecordLog = () => {
  const { workingHours } = useCompany();

  if (workingHours === null) {
    return;
  }

  const getHoursArray = (): string[] => {
    const { hours } = workingHours[0];
    const { from, to } = hours;

    return dayHours.filter(
      h =>
        Number(h.split(':')[0]) >= Number(from.split(':')[0]) &&
        Number(h.split(':')[0]) <= Number(to.split(':')[0])
    );
  };

  const schedule = getHoursArray();
  const timeItems = Array.from({ length: schedule.length * 4 - 4 });

  return (
    <RecordContainer>
      {schedule.length > 0 && <HoursList workHours={schedule} />}
      <RecordLogList workHours={timeItems} />
    </RecordContainer>
  );
};

export default RecordLog;
