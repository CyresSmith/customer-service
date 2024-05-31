import Button from 'components/Ui/Buttons/Button';
import Checkbox from 'components/Ui/Form/Checkbox';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectHandler } from 'components/Ui/Form/types';
import generateTimeArray, { getSchedule } from 'helpers/generateTimeArray';
import { IoIosSave } from 'react-icons/io';
import {
    ButtonsBox,
    ScheduleSection,
    ScheduleSectionBox,
    SelectBox,
    SelectDaysBox,
    SelectionBox,
    Title,
} from './ScheduleTimeSelection.styled';

const timeArray = generateTimeArray();

type Props = {
    from: string;
    setFrom: (from: string) => void;
    to: string;
    setTo: (to: string) => void;
    isBreak: boolean;
    breakToggle: () => void;
    breakFrom: string;
    setBreakFrom: (item: string) => void;
    breakTo: string;
    setBreakTo: (breakTo: string) => void;
    isEditingAllowed: boolean;
    handleUpdate: () => void;
    isUpdateLoading: boolean;
    isUpdateDisabled: boolean;
    selectedHours?: { from: string; to: string };
    isTitle?: boolean;
};

const ScheduleTimeSelection = ({
    from,
    setFrom,
    to,
    setTo,
    isBreak,
    breakToggle,
    breakFrom,
    setBreakFrom,
    breakTo,
    setBreakTo,
    isEditingAllowed,
    handleUpdate,
    isUpdateLoading,
    isUpdateDisabled,
    selectedHours,
    isTitle = true,
}: Props) => {
    const isTimeForBreak = from !== '' && to !== '' && to >= timeArray[timeArray.indexOf(from) + 3];

    const handleSelect: SelectHandler = (item, fieldName) => {
        if (fieldName)
            switch (fieldName) {
                case 'from':
                    return setFrom(item.value);

                case 'to':
                    return setTo(item.value);

                case 'breakFrom':
                    return setBreakFrom(item.value);

                case 'breakTo':
                    return setBreakTo(item.value);

                default:
                    break;
            }
    };

    return (
        <SelectionBox>
            <ScheduleSectionBox>
                <ScheduleSection>
                    {isTitle && <Title>Робочій час</Title>}

                    <SelectDaysBox>
                        <SelectBox>
                            <p>з</p>

                            <CustomFormSelect
                                fieldName="from"
                                selectItems={getSchedule(
                                    timeArray,
                                    selectedHours?.from || from,
                                    selectedHours?.to || to
                                ).map(value => ({ value }))}
                                selectedItem={{ value: from }}
                                handleSelect={handleSelect}
                                disabled={!isEditingAllowed}
                                visibleItemsCount={3}
                            />
                        </SelectBox>

                        <SelectBox>
                            <p>до</p>

                            <CustomFormSelect
                                fieldName="to"
                                selectItems={getSchedule(
                                    timeArray,
                                    timeArray[timeArray.indexOf(from) + 1],
                                    selectedHours?.to || to
                                ).map(value => ({ value }))}
                                selectedItem={{ value: to }}
                                handleSelect={handleSelect}
                                disabled={!isEditingAllowed || from === ''}
                                visibleItemsCount={3}
                            />
                        </SelectBox>
                    </SelectDaysBox>
                </ScheduleSection>

                <ScheduleSection>
                    <Checkbox
                        isChecked={isBreak}
                        handleCheck={breakToggle}
                        name="break"
                        isReadonly={!isTimeForBreak}
                    />
                    {isBreak && (
                        <SelectDaysBox>
                            <SelectBox>
                                <p>з</p>

                                <CustomFormSelect
                                    fieldName="breakFrom"
                                    selectItems={getSchedule(
                                        timeArray,
                                        timeArray[timeArray.indexOf(from) + 1],
                                        timeArray[timeArray.indexOf(breakTo) - 1] ||
                                            timeArray[timeArray.indexOf(to) - 1]
                                    ).map(value => ({ value }))}
                                    selectedItem={{ value: breakFrom }}
                                    handleSelect={handleSelect}
                                    disabled={!isEditingAllowed}
                                    visibleItemsCount={3}
                                />
                            </SelectBox>

                            <SelectBox>
                                <p>до</p>

                                <CustomFormSelect
                                    fieldName="breakTo"
                                    selectItems={getSchedule(
                                        timeArray,
                                        timeArray[timeArray.indexOf(breakFrom) + 1] || '',
                                        to ? timeArray[timeArray.indexOf(to) - 1] : ''
                                    ).map(value => ({ value }))}
                                    selectedItem={{ value: breakTo }}
                                    handleSelect={handleSelect}
                                    disabled={!isEditingAllowed || breakFrom === ''}
                                    visibleItemsCount={3}
                                />
                            </SelectBox>
                        </SelectDaysBox>
                    )}
                </ScheduleSection>
            </ScheduleSectionBox>

            {isEditingAllowed && (
                <ButtonsBox>
                    <Button
                        isLoading={isUpdateLoading}
                        onClick={handleUpdate}
                        Icon={IoIosSave}
                        disabled={isUpdateLoading || isUpdateDisabled}
                        $colors="accent"
                    >
                        Зберегти
                    </Button>
                </ButtonsBox>
            )}
        </SelectionBox>
    );
};

export default ScheduleTimeSelection;
