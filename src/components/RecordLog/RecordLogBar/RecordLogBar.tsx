import Button from 'components/Ui/Buttons/Button';
import DateSwitcher from 'components/Ui/DateSwitcher';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction } from 'react';
import { Container, LeftWrapper } from './RecordLogBar.styled';
import { HiPlus } from 'react-icons/hi';

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
        <DateSwitcher dateType="day" date={date} setDate={setDate} />
      </LeftWrapper>
      <Button
        onClick={() => openEventModal('create')}
        Icon={HiPlus}
        children="Додати запис"
        $colors="accent"
      />
    </Container>
  );
};

export default RecordLogBar;
