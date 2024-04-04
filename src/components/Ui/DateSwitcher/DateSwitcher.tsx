import { Dispatch, SetStateAction } from 'react';
import Button from '../Buttons/Button';
import { Container, DateWrapper, DateValue, ReturnBtnWrapper } from './DateSwitcher.styled';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { addDays, addMonths, addYears } from 'date-fns';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { isSameDay } from 'date-fns';

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    dateType: 'day' | 'month' | 'year';
    buttonsColor?: 'light' | 'dark' | 'transparent';
    roundBtns?: boolean;
    borderRadius?: 'xs' | 's' | 'm';
    border?: 'light' | 'dark';
    fontSize?: string;
    noReset?: boolean;
};

const DateSwitcher = ({
    noReset = false,
    date,
    setDate,
    dateType = 'day',
    buttonsColor = 'transparent',
    roundBtns = true,
    border,
    borderRadius = 's',
    fontSize = '16px',
}: Props) => {
    const chosenDate = new Date(date).toLocaleDateString('uk-UK', {
        weekday: dateType === 'day' ? 'short' : undefined,
        day: dateType === 'day' ? 'numeric' : undefined,
        month: dateType === 'year' ? undefined : 'long',
        year: dateType === 'year' ? 'numeric' : undefined,
    });

    const isSameCalendarDay = isSameDay(new Date(Date.now()), date);

    const handleDateChange = (event: string) => {
        if (event === '+') {
            setDate(() => {
                return dateType === 'day'
                    ? addDays(date, 1)
                    : dateType === 'month'
                      ? addMonths(date, 1)
                      : addYears(date, 1);
            });
        } else {
            setDate(() => {
                return dateType === 'day'
                    ? addDays(date, -1)
                    : dateType === 'month'
                      ? addMonths(date, -1)
                      : addYears(date, -1);
            });
        }
    };

    return (
        <Container $border={border} $borderRadius={borderRadius} $type={dateType}>
            <Button
                onClick={() => handleDateChange('-')}
                Icon={HiArrowLeft}
                $round={roundBtns}
                $colors={buttonsColor}
            />
            <DateWrapper $border={border} $type={dateType}>
                <DateValue $fontSize={fontSize}>{chosenDate}</DateValue>
            </DateWrapper>
            <Button
                onClick={() => handleDateChange('+')}
                Icon={HiArrowRight}
                $round={roundBtns}
                $colors={buttonsColor}
            />
            {!isSameCalendarDay && !noReset && (
                <ReturnBtnWrapper>
                    <Button
                        onClick={() => setDate(new Date(Date.now()))}
                        Icon={RiArrowGoBackFill}
                        $colors="light"
                        size="s"
                    />
                </ReturnBtnWrapper>
            )}
        </Container>
    );
};

export default DateSwitcher;
