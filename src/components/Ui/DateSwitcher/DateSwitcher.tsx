import { addDays, addMonths, addYears, format, isSameDay, startOfMonth } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Button from '../Buttons/Button';
import { Container, DateValue, DateWrapper, ReturnBtnWrapper } from './DateSwitcher.styled';

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
    fontSize,
}: Props) => {
    const chosenDate =
        dateType === 'month'
            ? format(date, 'LLLL yyyy')
            : new Date(date).toLocaleDateString('uk-UK', {
                  weekday: dateType === 'day' ? 'short' : undefined,
                  day: dateType === 'day' ? 'numeric' : undefined,
                  month: dateType === 'year' ? undefined : 'long',
                  year: dateType === 'year' ? 'numeric' : undefined,
              });

    const isSameCalendarDay =
        dateType === 'month'
            ? isSameDay(startOfMonth(new Date(Date.now())), startOfMonth(date))
            : isSameDay(new Date(Date.now()), date);

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
                        onClick={() => {
                            const date = new Date(Date.now());
                            setDate(dateType === 'month' ? startOfMonth(date) : date);
                        }}
                        Icon={RiArrowGoBackFill}
                        $colors="light"
                        $round
                    />
                </ReturnBtnWrapper>
            )}
        </Container>
    );
};

export default DateSwitcher;
