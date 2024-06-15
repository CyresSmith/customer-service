import { format } from 'date-fns';
import { useClickOutside, useEscapeKey } from 'hooks';
import useMountTransition from 'hooks/useMountTransition';
import { useEffect, useState } from 'react';
import { MdCalendarMonth } from 'react-icons/md';
import Calendar from '../Calendar/Calendar';
import DateSwitcher from '../DateSwitcher';
import { DateBox, Picker, PickerIcon, Wrapper } from './DatePicker.styled';

type Props = {
    prevDate?: Date;
    bgColor: 'dark' | 'light';
    handleDateConfirm: (date: Date) => void;
    calendarCellSize?: number;
};

const DatePicker = ({ bgColor, calendarCellSize = 30, handleDateConfirm, prevDate }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const mounted = useMountTransition({ isMounted: isOpen, mountDelay: 1, unmountDelay: 100 });

    const initialState = new Date(1990, 0, 1);
    const [date, setDate] = useState<Date>(prevDate ? prevDate : initialState);

    const toggleOpen = () => {
        setIsOpen(o => !o);
    };

    const handleClose = () => {
        setIsOpen(false);
        setDate(prevDate ? prevDate : initialState);
    };

    const handleConfirm = () => {
        handleDateConfirm(date);
        setIsOpen(false);
    };

    useEscapeKey(handleClose);
    const selectRef = useClickOutside<HTMLDivElement>(handleClose);

    const output = format(date, 'dd.MM.y');

    useEffect(() => {
        if (!date) return;

        handleDateConfirm(date);
        setIsOpen(false);
    }, [date]);

    return (
        <Wrapper ref={selectRef}>
            <Picker
                onClick={toggleOpen}
                $isOpen={isOpen}
                value={
                    JSON.stringify(initialState) === JSON.stringify(date)
                        ? 'Встановити дату'
                        : output
                }
                readOnly={true}
            />
            {isOpen && (
                <DateBox $bgColor={bgColor} $isOpen={mounted}>
                    <DateSwitcher
                        fontSize="18px"
                        noReset={true}
                        dateType="year"
                        date={date}
                        setDate={setDate}
                    />
                    <DateSwitcher
                        fontSize="18px"
                        noReset={true}
                        dateType="month"
                        date={date}
                        setDate={setDate}
                    />
                    <Calendar
                        padding="0"
                        cellSize={calendarCellSize}
                        noSwitcher
                        date={date}
                        setDate={setDate}
                    />
                </DateBox>
            )}
            <PickerIcon $isOpen={isOpen} as={MdCalendarMonth} />
        </Wrapper>
    );
};

export default DatePicker;
