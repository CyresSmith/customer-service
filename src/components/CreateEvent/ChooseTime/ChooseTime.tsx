import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import generateTimeArray, { getSchedule } from 'helpers/generateTimeArray';
import { getScheduleWithoutEvents } from 'helpers/isTimeEnableForEvent';
import { IDaySchedule } from 'services/types/schedule.types';
import { NoEnableHours, SelectWrapper } from './ChooseTime.styled';
import { EventType } from 'services/types/event.types';
import { getDate } from 'date-fns';

type Props = {
    events: EventType[] | null;
    eventDate: Date;
    eventTime: string | null;
    setEventTime: React.Dispatch<React.SetStateAction<string | null>>;
    daySchedule: IDaySchedule | undefined;
    eventDuration: number;
};

const ChooseTime = ({
    eventDate,
    eventDuration,
    eventTime,
    daySchedule,
    setEventTime,
    events,
}: Props) => {
    if (!daySchedule) {
        return;
    }

    const { hours } = daySchedule;

    const employeeDaySchedule = getSchedule(generateTimeArray(true), hours.from, hours.to);

    const scheduleWithoutEvents = getScheduleWithoutEvents(
        eventDate,
        employeeDaySchedule,
        events?.filter(e => e.day === getDate(eventDate)),
        eventDuration
    );

    const forSelect = scheduleWithoutEvents.map(eh => {
        return { value: eh };
    });

    const handleTimeSelect = (item: SelectItem) => {
        setEventTime(item.value);
    };

    return (
        <SelectWrapper>
            {forSelect.length > 0 ? (
                <CustomFormSelect
                    width="50%"
                    handleSelect={handleTimeSelect}
                    selectItems={forSelect}
                    selectedItem={{ value: eventTime ? eventTime : '' }}
                />
            ) : (
                <NoEnableHours>Час для запису у обраний день недоступний :(</NoEnableHours>
            )}
        </SelectWrapper>
    );
};

export default ChooseTime;
