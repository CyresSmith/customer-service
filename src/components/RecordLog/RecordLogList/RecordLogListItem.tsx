import EmployeeRecordsList from "./EmployeeRecordsList";
import { ListItem } from "./RecordLogList.styled"

type Props = {
    wh: number;
    actions: {
        from: number;
        to: number;
    }[];
};

export const RecordLogListItem = ({wh, actions}: Props) => {
    return (
        <ListItem $wh={wh}>
            <EmployeeRecordsList actions={actions} wh={wh} />
        </ListItem>
    )
};