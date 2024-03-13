import Button from 'components/Ui/Buttons/Button';
import DateSwitcher from 'components/Ui/DateSwitcher';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction } from 'react';
import { Container, LeftWrapper } from './RecordLogBar.styled';
import { HiPlus } from "react-icons/hi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { isSameDay } from 'date-fns';

type Props = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  selectItems: SelectItem[];
  selected: SelectItem[];
  handleSelect: (item: SelectItem) => void;
  openEventModal: (step: string) => void;
};

const RecordLogBar = ({
  date,
  setDate,
  handleSelect,
  selected,
  selectItems,
  openEventModal,
}: Props) => {
  const isSameCalendarDay = isSameDay(new Date(Date.now()), date);

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
        <DateSwitcher dateType='day' date={date} setDate={setDate} />
        {!isSameCalendarDay && <Button onClick={() => setDate(new Date(Date.now()))} Icon={RiArrowGoBackFill} children='до сьогодні' $colors='light' />}
      </LeftWrapper>
      <Button onClick={() => openEventModal('create')} Icon={HiPlus} children="Додати запис" $colors='accent' />
    </Container>
  );
};

export default RecordLogBar;
