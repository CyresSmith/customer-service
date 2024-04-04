import { List, ListItem, Time } from './TymeList.styled';

type Props = {
    workHours: string[];
    side: string;
};

const TimeList = ({ workHours, side }: Props) => {
    return (
        <List $side={side}>
            {workHours.map((wh, i) => (
                <ListItem
                    key={i}
                    $half={wh.includes(':30')}
                    $quarter={wh.includes(':15') || wh.includes(':45')}
                >
                    <Time>{wh}</Time>
                </ListItem>
            ))}
        </List>
    );
};

export default TimeList;
