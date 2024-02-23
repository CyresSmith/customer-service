import { List } from "./RecordLogList.styled"
import { RecordLogListItem } from "./RecordLogListItem";
import { getSchedule } from "helpers/generateTimeArray";

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

    const getEmployeeSchedule = (): string[]=> {
        const { from, to } = item.hours;

        const workingHours = getSchedule(companySchedule, from, to);

        return companySchedule.map(ch => {
            if (workingHours.slice(0, workingHours.length - 1).includes(ch)) {
                return ch;
            } else {
                return 'skip'
            }
        });
    };

    const employeeSchedule = getEmployeeSchedule();

    return (
        <List $wh={employeeSchedule.length}>
            {employeeSchedule.map((hour, i) => <RecordLogListItem key={i} index={i} hour={hour} /> )}
        </List>
    )
};

export default RecordLogList;