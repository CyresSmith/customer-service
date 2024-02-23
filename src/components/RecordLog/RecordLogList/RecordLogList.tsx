import { EmployeeEvent } from "./EmployeeEvent";
import { List, ListWrapper } from "./RecordLogList.styled"
import { RecordLogListItem } from "./RecordLogListItem";
import { getSchedule } from "helpers/generateTimeArray";

export type EventType = {
    id: number,
    time: {
        from: string,
        to: string
    }
}

type Props = {
    companySchedule: string[];
    item: {
        day: number,
        hours: {
            from: string,
            to: string
        },
        events?: EventType[],
    }
};

const RecordLogList = ({ item, companySchedule }: Props) => {
    const { hours, events } = item;

    const getEmployeeSchedule = (): string[]=> {
        const { from, to } = hours;

        const workingHours = getSchedule(companySchedule, from, to);

        const fullSchedule = companySchedule.map(ch => {
            if (workingHours.slice(0, workingHours.length - 1).includes(ch)) {
                return ch;
            } else {
                return 'skip'
            }
        });

        fullSchedule.splice(fullSchedule.length - 1, 1)

        return fullSchedule;
    };

    const employeeSchedule = getEmployeeSchedule();

    return (
        <ListWrapper>
            <List $wh={employeeSchedule.length}>
                {employeeSchedule.map((hour, i) => <RecordLogListItem key={i} index={i} hour={hour} />)}
            </List>
            {events && events?.length > 0 && events.map((e, i) => <EmployeeEvent key={i} event={e} employeeSchedule={employeeSchedule} />)}
        </ListWrapper>
    )
};

export default RecordLogList;