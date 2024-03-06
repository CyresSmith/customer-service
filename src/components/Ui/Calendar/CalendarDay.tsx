import { Day, DayDate } from "./Calendar.styled"

type Props = {
    date: number;
    isToday: boolean;
    selected: boolean;
    anotherMonth: boolean;
    handleClick: () => void;
};

export const CalendarDay = ({ anotherMonth, date, isToday, selected, handleClick }: Props) => {

    return (
        <Day onClick={handleClick} $today={isToday} $selected={selected} $anotherMonth={anotherMonth}>
            <DayDate $today={isToday}>
                {date}
            </DayDate>
        </Day>
    )
};