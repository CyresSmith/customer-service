import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import generateTimeArray, { getSchedule } from 'helpers/generateTimeArray';
import { isTimeEnableForEvent } from 'helpers/isTimeEnableForEvent';
import { IDaySchedule } from 'services/types/schedule.types';

type Props = {
    eventDate: Date;
    eventTime: string;
    setEventTime: React.Dispatch<React.SetStateAction<string>>;
    daySchedule: IDaySchedule | undefined;
    eventDuration: number;
};

const ChooseTime = ({ eventDate, eventDuration, eventTime, daySchedule, setEventTime }: Props) => {
    if (!daySchedule) {
        return;
    }

    const { hours } = daySchedule;

    const timeArray = getSchedule(generateTimeArray(true), hours.from, hours.to);
    const enableHours = timeArray.filter(t =>
        isTimeEnableForEvent(eventDate, eventDuration, t, timeArray[timeArray.length - 1])
    );

    const forSelect = enableHours.map(eh => {
        return { value: eh };
    });

    const handleTimeSelect = (item: SelectItem) => {
        setEventTime(item.value);
    };

    return (
        <>
            <CustomFormSelect
                width="fit-content"
                handleSelect={handleTimeSelect}
                selectItems={forSelect}
                selectedItem={{ value: eventTime }}
            />
        </>
    );
};

export default ChooseTime;
