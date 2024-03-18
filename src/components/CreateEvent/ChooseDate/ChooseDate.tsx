import { IMonthSchedule } from "services/types/schedule.types";
import { CalendarBox, Container } from "./ChooseDate.styled";
import Calendar from "components/Ui/Calendar/Calendar";
import { isPast } from "date-fns";

type Props = {
    eventDate: Date;
    eventTime: string;
    setEventDate: React.Dispatch<React.SetStateAction<Date>>
    setEventTime: React.Dispatch<React.SetStateAction<string>>
    employeeSchedules: IMonthSchedule[];
}

const ChooseDate = ({ eventDate, eventTime, setEventDate, setEventTime, employeeSchedules }: Props) => {

    const enableDays = employeeSchedules.map(es => {
        return es.schedule.map(s => {
            return new Date(es.year, es.month, s.day)
        })
    }).flat().filter(d => !isPast(d))

    return (
        <Container>
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