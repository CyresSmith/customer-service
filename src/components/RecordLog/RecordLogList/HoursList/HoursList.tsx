import { List, ListItem } from "./HoursList.styled";

type Props = {
    workHours: unknown[];
};

const HoursList = ({workHours}: Props) => {
    return (
        <List>
            {workHours.map((wh, i) => <ListItem key={i} />)}
        </List>
    )
};

export default HoursList;