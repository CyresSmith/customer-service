import { ListItem, ListItemContent } from "./EmployeeRecordsList.styled"

type Props = {
    action: {
        from: number;
        to: number;
    }
};

export const EmployeeRecordsListItem = ({ action }: Props) => {

    return (
        <ListItem $from={action.from} $to={action.to}>
            <ListItemContent>
                
            </ListItemContent>
        </ListItem>
    )
}