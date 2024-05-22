import ConfirmEvent from 'components/CreateEvent/ConfirmEvent';
import Modal from 'components/Ui/Modal/Modal';
import { calculateEventDuration } from 'helpers/calculateEventDuration';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import { useState } from 'react';
import { IEmployee } from 'services/types/employee.types';
import { EventType } from 'services/types/event.types';
import { ServiceBasicInfo } from 'services/types/service.type';
import { Event, EventInfo, EventTitle, EventWrapper } from './EmployeeEvent.styled';

type Props = {
    event: EventType;
    employeeSchedule: string[];
};

enum OpenModal {
    EVENT = 1,
}

const EmployeeEvent = ({ event, employeeSchedule }: Props) => {
    const { time, duration, client, services } = event;

    const [modalOpen, setModalOpen] = useState<OpenModal | null>(null);

    const start = employeeSchedule.indexOf(time.from);
    const height = (duration / 1000 / 60) * 2;

    const eventTitle =
        services.length > 1
            ? services.reduce((acc: string, { name }, i) => {
                  return i === services.length - 1 ? acc + name : acc + name + ', ';
              }, '')
            : services[0].name;

    return (
        <EventWrapper $top={start} $height={height}>
            <Event onClick={() => setModalOpen(OpenModal.EVENT)}>
                <EventTitle>
                    <span>{eventTitle}</span>
                    <span>
                        {time.from} - {time.to}
                    </span>
                </EventTitle>
                {height >= 30 && (
                    <EventInfo>
                        <span>
                            <b>Клієнт:</b> {client.firstName} {client.lastName || ''}
                        </span>
                    </EventInfo>
                )}
            </Event>

            {modalOpen && (
                <>
                    {modalOpen === OpenModal.EVENT && (
                        <Modal
                            $isOpen={modalOpen === OpenModal.EVENT}
                            closeModal={() => setModalOpen(null)}
                            id="event-info-modal"
                            title={capitalizeFirstLetter(String(eventTitle))}
                            titleMargin="10px"
                        >
                            <ConfirmEvent
                                chosenEmployee={event.employee as IEmployee}
                                chosenClient={event.client}
                                chosenServices={event.services as ServiceBasicInfo[]}
                                eventDate={new Date(event.year, event.month, event.day)}
                                eventTime={event.time.from}
                                eventDuration={calculateEventDuration(
                                    event.services as ServiceBasicInfo[]
                                )}
                            />
                        </Modal>
                    )}
                </>
            )}
        </EventWrapper>
    );
};

export default EmployeeEvent;
