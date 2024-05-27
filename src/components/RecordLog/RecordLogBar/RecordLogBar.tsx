import Button from 'components/Ui/Buttons/Button';
import DateSwitcher from 'components/Ui/DateSwitcher';
import { FormInputLabel, FormInputsListItem } from 'components/Ui/Form/CustomForm.styled';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { useClickOutside } from 'hooks';
import { Dispatch, SetStateAction } from 'react';
import { HiPlus } from 'react-icons/hi';
import { HiCalendarDays } from 'react-icons/hi2';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { Container, LeftWrapper, RightWrapper } from './RecordLogBar.styled';

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    selectItems: SelectItem[];
    selected: SelectItem[];
    handleSelect: (item: SelectItem) => void;
    openEventModal: (step: string) => void;
    calendarToggle: () => void;
    closeCalendar: () => void;
};

const RecordLogBar = ({
    date,
    setDate,
    handleSelect,
    selected,
    selectItems,
    openEventModal,
    calendarToggle,
    closeCalendar,
}: Props) => {
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);
    const ref = useClickOutside<HTMLDivElement>(closeCalendar);

    return (
        <Container>
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

            <RightWrapper ref={isDesktop ? undefined : ref}>
                <Button
                    onClick={() => openEventModal('create')}
                    Icon={HiPlus}
                    children="Додати запис"
                    $colors="accent"
                />
                {!isDesktop && (
                    <Button onClick={calendarToggle} Icon={HiCalendarDays} $colors="accent" />
                )}
            </RightWrapper>
        </Container>
    );
};

export default RecordLogBar;
