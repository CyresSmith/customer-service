import { useState } from "react";
import { Picker, DateBox, Wrapper, DateRow, PickerIcon, BtnsWrapper } from "./DatePicker.styled";
import Calendar from "../Calendar/Calendar";
import DateSwitcher from "../DateSwitcher";
import { useClickOutside, useEscapeKey } from "hooks";
import { format } from "date-fns";
import useMountTransition from "hooks/useMountTransition";
import { MdCalendarMonth } from "react-icons/md";
import Button from "../Buttons/Button";

type Props = {
    bgColor: 'dark' | 'light';
    handleDateConfirm: (date: Date) => void;
    calendarCellSize?: number;
}

const initialState = new Date(1990, 0, 1);

const DatePicker = ({ bgColor, calendarCellSize = 30, handleDateConfirm }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(initialState);
    const mounted = useMountTransition({isMounted: isOpen, mountDelay: 1, unmountDelay: 100});

    const toggleOpen = () => {
        setIsOpen(o => !o);
    };

    const handleClose = () => {
        setIsOpen(false);
        setDate(initialState);
    };

    const handleConfirm = () => {
        handleDateConfirm(date);
    };

    useEscapeKey(handleClose);
    const selectRef = useClickOutside(handleClose);

    const output = format(date, 'dd.MM.y');

    return (
        <Wrapper ref={selectRef}>
            <Picker $isOpen={isOpen} onClick={toggleOpen}>
                <DateRow>{date === initialState ? 'Встановити дату' : output}</DateRow>
                <PickerIcon $isOpen={isOpen} as={MdCalendarMonth} />
            </Picker>
            {isOpen &&
                <DateBox $bgColor={bgColor} $isOpen={mounted}>
                    <DateSwitcher fontSize="18px" noReset={true} dateType="year" date={date} setDate={setDate} />
                    <DateSwitcher fontSize="18px" noReset={true} dateType="month" date={date} setDate={setDate} />
                    <Calendar padding="0" cellSize={calendarCellSize} noSwitcher={true} date={date} setDate={setDate} />
                    <BtnsWrapper>
                        <Button size="s" onClick={handleConfirm} children='Підвердити' $colors="accent" />
                        <Button size="s" onClick={handleClose} children='Закрити' $colors="light" />
                    </BtnsWrapper>
                </DateBox>
            }
        </Wrapper>
    )
};

export default DatePicker;