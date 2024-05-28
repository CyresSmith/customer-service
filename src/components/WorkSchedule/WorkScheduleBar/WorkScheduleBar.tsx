import { Container, LeftWrapper } from 'components/RecordLog/RecordLogBar/RecordLogBar.styled';
import Button from 'components/Ui/Buttons/Button';
import ConfirmOperation from 'components/Ui/ConfirmOperation';
import DateSwitcher from 'components/Ui/DateSwitcher';
import { FormInputLabel, FormInputsListItem } from 'components/Ui/Form/CustomForm.styled';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiRefresh, HiX } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi2';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { SelectedDays } from '../types';
import { ButtonsList } from './WorkScheduleBar.styled';

type Props = {
    providers: BasicEmployeeInfo[];
    setSelectedProviders: Dispatch<SetStateAction<number[]>>;
    selectedMonth: Date;
    setSelectedMonth: Dispatch<SetStateAction<Date>>;
    selectedDays: SelectedDays[];
    onResetClick: () => Promise<void>;
    isResetLoading: boolean;
    resetSelection: () => void;
    onChangeClick: () => void;
    isEditingAllowed: boolean;
};

const selectAll = {
    id: 'all',
    value: 'Всі',
};

const WorkScheduleBar = ({
    providers,
    setSelectedProviders,
    selectedMonth,
    setSelectedMonth,
    selectedDays,
    onResetClick,
    isResetLoading,
    resetSelection,
    onChangeClick,
    isEditingAllowed,
}: Props) => {
    const initialSelection = [selectAll];

    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);

    const [selectedKeys, setSelectedKeys] = useState<SelectItem[]>(initialSelection);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const selectItems = [
        selectAll,
        ...providers.map(({ id, firstName, lastName }) => ({
            id,
            value: `${firstName} ${lastName && lastName}`,
        })),
    ];

    const handleSelect = (item: SelectItem) => {
        if (item.id === selectAll.id) {
            setSelectedKeys(initialSelection);
            setSelectedProviders(providers.map(({ id }) => id));
        } else {
            setSelectedKeys(p => {
                const newState = p.filter(({ id }) => id !== selectAll.id);
                const itemIdx = newState.findIndex(({ id }) => id === item.id);

                return itemIdx === -1
                    ? [...newState, item]
                    : newState.filter(({ id }) => id !== item.id);
            });
        }
    };

    useEffect(() => {
        if (selectedKeys.findIndex(({ id }) => id === 'all') !== -1) {
            setSelectedProviders(providers.map(({ id }) => id));
        } else {
            setSelectedProviders(
                providers
                    .filter(
                        item =>
                            selectedKeys.findIndex(({ id }) => String(id) === String(item.id)) !==
                            -1
                    )
                    .map(({ id }) => id)
            );
        }
    }, [selectedKeys]);

    useEffect(() => {
        if (selectedKeys.length === 0) {
            setSelectedKeys(initialSelection);
        }
    }, [selectedKeys.length]);

    return (
        <>
            <Container>
                <LeftWrapper>
                    <FormInputsListItem as="div">
                        <FormInputLabel>Співробітники</FormInputLabel>

                        <CustomFormSelect
                            width={isMobile ? '100%' : '200px'}
                            selectItems={selectItems}
                            selectedItem={selectedKeys}
                            handleSelect={handleSelect}
                        />
                    </FormInputsListItem>
                    <DateSwitcher
                        dateType="month"
                        setDate={setSelectedMonth}
                        date={selectedMonth}
                        buttonsColor="light"
                    />
                </LeftWrapper>

                {isEditingAllowed && selectedDays.length > 0 && (
                    <ButtonsList>
                        <li>
                            <Button
                                onClick={onChangeClick}
                                Icon={HiRefresh}
                                children={isDesktop ? 'Змінити' : undefined}
                                $colors="accent"
                                $round={isDesktop ? false : true}
                            />
                        </li>
                        <li>
                            <Button
                                onClick={() => setConfirmOpen(true)}
                                Icon={HiTrash}
                                children={isDesktop ? 'Видалити' : undefined}
                                $colors="accent"
                                isLoading={isResetLoading}
                                $round={isDesktop ? false : true}
                            />
                        </li>
                        <li>
                            <Button
                                onClick={resetSelection}
                                Icon={HiX}
                                children={isDesktop ? 'Зняти виделення' : undefined}
                                $colors="accent"
                                $round={isDesktop ? false : true}
                            />
                        </li>
                    </ButtonsList>
                )}
            </Container>

            {confirmOpen && (
                <ConfirmOperation
                    id="confirmReset"
                    isOpen={confirmOpen}
                    children="Скинути графік обраних днів?"
                    callback={() => onResetClick()}
                    closeConfirm={() => setConfirmOpen(false)}
                />
            )}
        </>
    );
};

export default WorkScheduleBar;
