import { IMonthSchedule } from "services/types/schedule.types";
import { CalendarBox, Container, SelectBox } from "./ChooseDate.styled";
import Calendar from "components/Ui/Calendar/Calendar";
import { getDate, getMonth, getYear, isPast } from "date-fns";
import ChooseTime from "../ChooseTime";

type Props = {
    eventDate: Date;
    eventTime: string;
    setEventDate: React.Dispatch<React.SetStateAction<Date>>
    setEventTime: React.Dispatch<React.SetStateAction<string>>
    employeeSchedules: IMonthSchedule[];
    eventDuration: number;
}

const ChooseDate = ({ eventDuration, eventDate, eventTime, setEventDate, setEventTime, employeeSchedules }: Props) => {

    const enableDays = employeeSchedules.map(es => {
        return es.schedule.map(s => {
            return new Date(es.year, es.month, s.day)
        })
    }).flat().filter(d => !isPast(d));

    const getDaySchedule = () => {
        const day = getDate(eventDate);
        const thisMonthSchedules = employeeSchedules.find(es => es.month === getMonth(eventDate) && es.year === getYear(eventDate))?.schedule;

        return thisMonthSchedules?.find(tms => tms.day === day);
    }


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
    )
};

export default ChooseDate;