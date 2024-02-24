import { Dispatch, SetStateAction } from "react";
import Button from "../Buttons/Button";
import { Container, DateWrapper, DateValue } from "./DateSwitcher.styled";
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
}

const DateSwitcher = ({ date, setDate }: Props) => {

    // const chosenDate = new Date(year, month, day).toLocaleDateString('uk-UK', { weekday: 'short', day: 'numeric', month: 'long' });

    return (
        <Container>
            <Button Icon={HiArrowLeft} $round={true} $colors="light" />
            <DateWrapper>
                {/* <DateValue>{ chosenDate }</DateValue> */}
            </DateWrapper>
            <Button Icon={HiArrowRight} $round={true} $colors="light" />
        </Container>
    )
};

export default DateSwitcher;