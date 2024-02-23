import { List } from "./RecordLogList.styled"
import { RecordLogListItem } from "./RecordLogListItem";
import { dayHours } from "../dayHours";

type Props = {
    companySchedule: string[];
    item: {
        day: number,
        hours: {
            from: string,
            to: string
        }
    }
};

const RecordLogList = ({ item, companySchedule }: Props) => {

    const getHoursArray = (): string[]=> {
        const { from, to } = item.hours;

        const workingHours = dayHours.filter(h => Number(h.split(':')[0]) >= Number(from.split(':')[0]) && Number(h.split(':')[0]) <= Number(to.split(':')[0]));
        
        const daySchedule = companySchedule.map(ch => {
            if (workingHours.includes(ch)) {
                return ch;
            } else {
                return 'skip'
            }
        });

        const schedule = daySchedule.map(h => {
            const hour = h.split(':');

            if (h === 'skip') {
                return ['skip', 'skip', 'skip', 'skip'];
            } else {
                return [h, hour[0] + ':15', hour[0] + ':30', hour[0] + ':45']
            }
        }).flat();

        schedule.splice(schedule.length - 5, 4);

        return schedule;
    };

    const daySchedule = getHoursArray();
    const gridArray = Array.from({ length: companySchedule.length * 4 - 4 });

    return (
        <List $wh={gridArray.length}>
            {daySchedule.map((hour, i) => <RecordLogListItem key={i} index={i} hour={hour} /> )}
        </List>
    )
};

export default RecordLogList;