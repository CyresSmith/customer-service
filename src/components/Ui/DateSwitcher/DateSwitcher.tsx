import {
  addDays,
  addMonths,
  addYears,
  format,
  setDefaultOptions,
} from 'date-fns';
import { uk } from 'date-fns/locale';
import { Dispatch, SetStateAction } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Button from '../Buttons/Button';
import { Container, DateValue, DateWrapper } from './DateSwitcher.styled';

setDefaultOptions({ locale: uk });

type Props = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  dateType: 'day' | 'month' | 'year';
  buttonsColor?: 'light' | 'dark' | 'transparent';
  roundBtns?: boolean;
  borderRadius?: 'xs' | 's' | 'm';
  border?: 'light' | 'dark';
  fontSize?: string;
};

const DateSwitcher = ({
  date,
  setDate,
  dateType = 'day',
  buttonsColor = 'transparent',
  roundBtns = true,
  border,
  borderRadius = 's',
  fontSize = '16px',
}: Props) => {
  const dateFormat =
    dateType === 'day'
      ? 'EEEEEE, PP'
      : dateType === 'month'
      ? 'LLLL yyyy'
      : 'yyyy';

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
        <DateValue $fontSize={fontSize}>{format(date, dateFormat)}</DateValue>
      </DateWrapper>
      <Button
        onClick={() => handleDateChange('+')}
        Icon={HiArrowRight}
        $round={roundBtns}
        $colors={buttonsColor}
      />
    </Container>
  );
};

export default DateSwitcher;
