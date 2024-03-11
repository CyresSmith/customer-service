import { ListItem, Time } from "./RecordLogList.styled";

type Props = {
    hour: string;
    index: number;
};

export const RecordLogListItem = ({ hour, index }: Props) => {

    return (
        <ListItem $isHour={index !== 0 && index! % 4 === 0} $skip={hour === 'skip'} $break={hour === 'break'}>
            <Time $break={hour === 'break'}>{ hour === 'break' ? `Перерва` : hour }</Time>
        </ListItem>
    )
};