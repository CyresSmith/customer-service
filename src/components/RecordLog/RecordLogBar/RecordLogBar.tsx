import Button from "components/Ui/Buttons/Button";
import DateSwitcher from "components/Ui/DateSwitcher";
import { Container } from "./RecordLogBar.styled";
import { Dispatch, SetStateAction } from "react";
// import CustomFormSelect from "components/Ui/Form/CustomFormSelect";
import { IEmployee } from "services/types/employee.types";

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    employees: IEmployee[];
}

const RecordLogBar = ({ date, setDate, employees }: Props) => {
    console.log(employees);
    
    return (
        <Container>
            <DateSwitcher date={date} setDate={setDate} />
            {/* <CustomFormSelect /> */}
            <Button children='Кнопка' />
        </Container>
    )
}

export default RecordLogBar;