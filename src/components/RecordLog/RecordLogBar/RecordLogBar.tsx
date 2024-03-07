import Button from 'components/Ui/Buttons/Button';
import DateSwitcher from 'components/Ui/DateSwitcher';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction } from 'react';
import { Container, LeftWrapper } from './RecordLogBar.styled';

type Props = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  selectItems: SelectItem[];
  selected: SelectItem[];
  handleSelect: (item: SelectItem) => void;
};

const RecordLogBar = ({
  date,
  setDate,
  handleSelect,
  selected,
  selectItems,
}: Props) => {
  return (
    <Container>
      <LeftWrapper>
        <CustomFormSelect
          width="300px"
          selectItems={selectItems}
          handleSelect={handleSelect}
          selectedItem={selected}
          closeOnSelect={false}
        />
        <DateSwitcher border='light' dateType='day' date={date} setDate={setDate} />
      </LeftWrapper>
      <Button children="Кнопка" />
    </Container>
  );
};

export default RecordLogBar;
