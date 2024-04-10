import DateSwitcher from 'components/Ui/DateSwitcher';
import { FormInputLabel, FormInputsListItem } from 'components/Ui/Form/CustomForm.styled';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BasicEmployeeInfo } from 'services/types/employee.types';

type Props = {
    providers: BasicEmployeeInfo[];
    setSelectedProviders: Dispatch<SetStateAction<number[]>>;
    selectedMonth: Date;
    setSelectedMonth: Dispatch<SetStateAction<Date>>;
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
}: Props) => {
    const initialSelection = [selectAll];

    const [selectedKeys, setSelectedKeys] = useState<SelectItem[]>(initialSelection);

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
            <FormInputsListItem as="div">
                <FormInputLabel>Співробітники</FormInputLabel>

                <CustomFormSelect
                    width="200px"
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
        </>
    );
};

export default WorkScheduleBar;
