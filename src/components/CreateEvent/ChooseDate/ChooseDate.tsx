import Calendar from 'components/Ui/Calendar/Calendar';
import { getDate, getMonth, getYear, isPast } from 'date-fns';
import { EventType } from 'services/types/event.types';
import { IMonthSchedule } from 'services/types/schedule.types';
import ChooseTime from '../ChooseTime';
import { CalendarBox, Container, SelectBox } from './ChooseDate.styled';

type Props = {
    eventDate: Date;
    eventTime: string | null;
    setEventDate: React.Dispatch<React.SetStateAction<Date>>;
    setEventTime: React.Dispatch<React.SetStateAction<string | null>>;
    employeeSchedules: IMonthSchedule[];
    eventDuration: number;
    companyId: number;
    events: EventType[] | null;
};

const ChooseDate = ({
    employeeSchedules,
    eventDate,
    eventDuration,
    eventTime,
    setEventDate,
    setEventTime,
    events,
}: Props) => {
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
                    events={events}
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
