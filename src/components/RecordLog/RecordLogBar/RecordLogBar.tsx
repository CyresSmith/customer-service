import Button from 'components/Ui/Buttons/Button';
import DateSwitcher from 'components/Ui/DateSwitcher';
import { FormInputLabel, FormInputsListItem } from 'components/Ui/Form/CustomForm.styled';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction } from 'react';
import { HiPlus } from 'react-icons/hi';
import { LeftWrapper } from './RecordLogBar.styled';

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
        <>
            <LeftWrapper>
                <FormInputsListItem as="div">
                    <FormInputLabel>Співробітники</FormInputLabel>

                    <CustomFormSelect
                        width="200px"
                        selectItems={selectItems}
                        handleSelect={handleSelect}
                        selectedItem={selected}
                        closeOnSelect={false}
                    />
                </FormInputsListItem>

                <DateSwitcher
                    dateType="day"
                    date={date}
                    setDate={setDate}
                    roundBtns
                    buttonsColor="light"
                />
            </LeftWrapper>

            <Button
                onClick={() => openEventModal('create')}
                Icon={HiPlus}
                children="Додати запис"
                $colors="accent"
            />
        </>
    );
};

export default RecordLogBar;
