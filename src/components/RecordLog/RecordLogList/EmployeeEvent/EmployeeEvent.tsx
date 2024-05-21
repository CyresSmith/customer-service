import { EventType } from 'services/types/event.types';
import { Event, EventWrapper } from './EmployeeEvent.styled';

type Props = {
    event: EventType;
    employeeSchedule: string[];
};

const EmployeeEvent = ({ event, employeeSchedule }: Props) => {
    const { time, duration } = event;

    const start = employeeSchedule.indexOf(time.from);
    const height = duration / 1000 / 60;

    return (
        <EventWrapper $top={start} $height={height}>
            <Event />
        </EventWrapper>
    );
};

export default EmployeeEvent;