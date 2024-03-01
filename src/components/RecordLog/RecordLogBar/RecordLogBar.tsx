import Button from "components/Ui/Buttons/Button";
import DateSwitcher from "components/Ui/DateSwitcher";
import { Container } from "./RecordLogBar.styled";
import { Dispatch, SetStateAction } from "react";
import CustomFormSelect from "components/Ui/Form/CustomFormSelect";
import { SelectItem } from "components/Ui/Form/types";

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    selectItems: SelectItem[];
    selected: SelectItem | SelectItem[];
    handleSelect: (item: SelectItem) => void;
}

const RecordLogBar = ({ date, setDate, handleSelect, selected, selectItems }: Props) => {

    return (
        <Container>
            <CustomFormSelect
                width="300px"
                selectItems={selectItems}
                handleSelect={handleSelect}
                selectedItem={selected}
                closeOnSelect={false}
            />
            <DateSwitcher date={date} setDate={setDate} />
            <Button children='Кнопка' />
        </Container>
    )
}

export default RecordLogBar;