import { EventType } from "./RecordLogList";
import { Event, EventWrapper } from "./RecordLogList.styled"

type Props = {
    event: EventType;
    employeeSchedule: string[];
};

export const EmployeeEvent = ({event, employeeSchedule}: Props) => {
    const { from, to } = event.time;

    const start = employeeSchedule.indexOf(from);
    const end = employeeSchedule.indexOf(to);

    return (
        <EventWrapper $top={start} $height={end - start}>
            <Event />
        </EventWrapper>
    )
};