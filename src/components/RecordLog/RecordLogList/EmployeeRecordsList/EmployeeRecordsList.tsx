import { List } from "./EmployeeRecordsList.styled";
import { EmployeeRecordsListItem } from "./EmployeeRecordsListItem";

type Props = {
    wh: number;
    actions: {
        from: number;
        to: number;
    }[];
}

const EmployeeRecordsList = ({wh, actions}: Props) => {
    return (
        <List $wh={wh}>
            {actions.map((a, i) => <EmployeeRecordsListItem key={i} action={a} />)}
        </List>
    )
};

export default EmployeeRecordsList;