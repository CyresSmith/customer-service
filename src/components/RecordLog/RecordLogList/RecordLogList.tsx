import { List } from "./RecordLogList.styled"
import { RecordLogListItem } from "./RecordLogListItem";

const items = [
    [
        { from: 1, to: 4 },
        { from: 5, to: 6 },
        { from: 10, to: 15 },
    ],
    [
        { from: 2, to: 7 },
        { from: 7, to: 9 },
        {from: 9, to: 20}
    ],
    [
        { from: 8, to: 11 },
        { from: 12, to: 20 },
    ],
]

type Props = {
    workHours: unknown[];
};

const RecordLogList = ({workHours}: Props) => {
    return (
        <List $wh={workHours.length}>
            {items.map((item, i) => <RecordLogListItem actions={item} wh={workHours.length} key={i} />)}
        </List>
    )
};

export default RecordLogList;