import { EventType } from 'services/types/event.types';
import { EventInfo, EventInfoItem, EventWrapper } from './RecordLogList.styled';

type Props = {
    event: EventType;
    employeeSchedule: string[];
};

export const EmployeeEvent = ({ event, employeeSchedule }: Props) => {
    const {
        time,
        duration,
        client: { phone },
        services,
    } = event;

    const start = employeeSchedule.indexOf(time.from);
    const height = duration / 1000 / 60;

    return (
        <EventWrapper $top={start} $height={height}>
            <EventInfo>
                <EventInfoItem>Час: {`${time.from} - ${time.to}`}</EventInfoItem>
                {/* <EventInfoItem>
                    Клієнт: {`${lastName ? firstName + ' ' + lastName : firstName}`}
                </EventInfoItem> */}
                <EventInfoItem>Телефон клієнта: {phone}</EventInfoItem>
                <EventInfoItem>
                    Послуги:{' '}
                    {services.map(({ name }) => (
                        <span>{name} </span>
                    ))}
                </EventInfoItem>
            </EventInfo>
        </EventWrapper>
    );
};
