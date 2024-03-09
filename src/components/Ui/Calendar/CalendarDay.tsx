import { Day, DayDate } from "./Calendar.styled"

type Props = {
    date: number;
    isToday: boolean;
    selected: boolean;
    anotherMonth: boolean;
    handleClick: () => void;
    cellSize: number;
};

export const CalendarDay = ({ anotherMonth, date, isToday, selected, handleClick, cellSize }: Props) => {

    return (
        <Day $cellSize={cellSize} onClick={handleClick} $today={isToday} $selected={selected} $anotherMonth={anotherMonth}>
            <DayDate $today={isToday} $cellSize={cellSize}>
                {date}
            </DayDate>
        </Day>
    )
};