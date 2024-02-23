import { Half, Hour, List, ListItem, Quarter, Time } from "./TimeList.styled"

type Props = {
    workHours: string[];
    side: string;
}

export const TimeList = ({ workHours, side }: Props) => {
    const cleanHour = (hour: string) => hour.split(':')[0];

    return (
        <List $side={side}>
            {workHours.map((wh, i) =>
                <ListItem key={i}>
                    <Hour><Time>{wh}</Time></Hour>
                    {i !== workHours.length - 1 &&
                        <>
                            <Quarter><Time>{cleanHour(wh) + ':15'}</Time></Quarter>
                            <Half><Time>{cleanHour(wh) + ':30'}</Time></Half>
                            <Quarter><Time>{cleanHour(wh) + ':45'}</Time></Quarter>
                        </>
                    }
                </ListItem>
            )}
        </List>
    )
};