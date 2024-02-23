import { GridList, GridListItem } from "./TimeList.styled";

type Props = {
    hours: string[];
};

export const TimeGrid = ({hours}: Props) => {
    const timeArray = Array.from({ length: hours.length * 4 - 4 });

    return (
        <GridList>
            {timeArray.map((time, i) => <GridListItem key={i} />)}
        </GridList>
    )
}