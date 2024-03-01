import { Dispatch, SetStateAction } from "react";
import Button from "../Buttons/Button";
import { Container, DateWrapper, DateValue } from "./DateSwitcher.styled";
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { addDays, subDays } from "date-fns";

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
}

const DateSwitcher = ({ date, setDate }: Props) => {

    const chosenDate = new Date(date).toLocaleDateString('uk-UK', { weekday: 'short', day: 'numeric', month: 'long' });

    const handleDayChange = (event: string) => {
        if (event === '+') {
            setDate(addDays(date, 1));
        } else {
            setDate(subDays(date, 1));
        }
    };

    return (
        <Container>
            <Button onClick={() => handleDayChange('-')} Icon={HiArrowLeft} $round={true} $colors="light" />
            <DateWrapper>
                <DateValue>{ chosenDate }</DateValue>
            </DateWrapper>
            <Button onClick={() => handleDayChange('+')} Icon={HiArrowRight} $round={true} $colors="light" />
        </Container>
    )
};

export default DateSwitcher;