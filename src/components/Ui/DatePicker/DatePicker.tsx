import { useState } from 'react';
import { Picker, DateBox, Wrapper, PickerIcon, BtnsWrapper } from './DatePicker.styled';
import Calendar from '../Calendar/Calendar';
import DateSwitcher from '../DateSwitcher';
import { useClickOutside, useEscapeKey } from 'hooks';
import { format } from 'date-fns';
import useMountTransition from 'hooks/useMountTransition';
import { MdCalendarMonth } from 'react-icons/md';
import Button from '../Buttons/Button';

type Props = {
    prewDate?: Date;
    bgColor: 'dark' | 'light';
    handleDateConfirm: (date: Date) => void;
    calendarCellSize?: number;
};

const DatePicker = ({ bgColor, calendarCellSize = 30, handleDateConfirm, prewDate }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const mounted = useMountTransition({
        isMounted: isOpen,
        mountDelay: 1,
        unmountDelay: 100,
    });

    const initialState = new Date(1990, 0, 1);
    const [date, setDate] = useState<Date>(prewDate ? prewDate : initialState);

    const toggleOpen = () => {
        setIsOpen(o => !o);
    };

    const handleClose = () => {
        setIsOpen(false);
        setDate(prewDate ? prewDate : initialState);
    };

    const handleConfirm = () => {
        handleDateConfirm(date);
        setIsOpen(false);
    };

    useEscapeKey(handleClose);
    const selectRef = useClickOutside(handleClose);

    const output = format(date, 'dd.MM.y');

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
                        noSwitcher={true}
                        date={date}
                        setDate={setDate}
                    />
                    <BtnsWrapper>
                        <Button
                            size="s"
                            onClick={handleConfirm}
                            children="Підвердити"
                            $colors="accent"
                        />
                        <Button size="s" onClick={handleClose} children="Закрити" $colors="light" />
                    </BtnsWrapper>
                </DateBox>
            )}
            <PickerIcon $isOpen={isOpen} as={MdCalendarMonth} />
        </Wrapper>
    );
};

export default DatePicker;
