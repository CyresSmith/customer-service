import { IMonthSchedule } from 'services/types/schedule.types';
import { CalendarBox, Container, SelectBox } from './ChooseDate.styled';
import { IEmployee } from 'services/types/employee.types';
import { getDate, getMonth, getYear, isPast } from 'date-fns';
import ChooseTime from '../ChooseTime';
import Calendar from 'components/Ui/Calendar/Calendar';

type Props = {
    eventDate: Date;
    eventTime: string;
    setEventDate: React.Dispatch<React.SetStateAction<Date>>;
    setEventTime: React.Dispatch<React.SetStateAction<string>>;
    employeeSchedules: IMonthSchedule[];
    eventDuration: number;
    companyId: number;
    chosenEmployee: IEmployee | null;
};

const ChooseDate = ({
    employeeSchedules,
    chosenEmployee,
    eventDate,
    eventDuration,
    eventTime,
    setEventDate,
    setEventTime,
}: Props) => {
    console.log(chosenEmployee);

    const enableDays = employeeSchedules
        .map(es => {
            const { year, month, schedule } = es;

            return schedule
                .map(es => {
                    return new Date(year, month, es.day);
                })
                .filter(d => !isPast(d));
        })
        .flat();

    const getDaySchedule = () => {
        const day = getDate(eventDate);
        const thisMonthSchedules = employeeSchedules.find(
            es => es.month === getMonth(eventDate) && es.year === getYear(eventDate)
        )?.schedule;

        return thisMonthSchedules?.find(tms => tms.day === day);
    };

    return (
        <Container>
            <SelectBox>
                <ChooseTime
                    eventDate={eventDate}
                    eventTime={eventTime}
                    setEventTime={setEventTime}
                    daySchedule={getDaySchedule()}
                    eventDuration={eventDuration}
                />
            </SelectBox>
            <CalendarBox>
                <Calendar
                    cellSize={30}
                    date={eventDate}
                    setDate={setEventDate}
                    enableDays={enableDays}
                />
            </CalendarBox>
        </Container>
    );
};

export default ChooseDate;
