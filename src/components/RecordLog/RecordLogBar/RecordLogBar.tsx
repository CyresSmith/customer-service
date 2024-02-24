import Button from "components/Ui/Buttons/Button";
import DateSwitcher from "components/Ui/DateSwitcher";
import { Container } from "./RecordLogBar.styled";
import { Dispatch, SetStateAction } from "react";

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
}

const RecordLogBar = ({date, setDate}: Props) => {
    return (
        <Container>
            <DateSwitcher date={date} setDate={setDate} />
            <Button children='Кнопка' />
        </Container>
    )
}

export default RecordLogBar;