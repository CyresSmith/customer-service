import Button from 'components/Ui/Buttons/Button';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { shortWeekDays, weekDays } from 'helpers/constants';
import generateTimeArray from 'helpers/generateTimeArray';
import { useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi2';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { ICompanySchedule } from '../SetScheduleModal';
import { DayList, Time, TimeBox, TimeWithButtonBox, WeekBox } from './SetWorkSchedule.styled';

type Props = {
    addSchedule: () => void;
    updateSchedule: (schedule: ICompanySchedule) => void;
    removeSchedule: (schedule: ICompanySchedule) => void;
    addDisabled: boolean;
    currentSchedule: ICompanySchedule;
    schedules: ICompanySchedule[];
};

const timeArray = generateTimeArray();

const SetWorkSchedule = ({
    addSchedule,
    updateSchedule,
    removeSchedule,
    currentSchedule,
    schedules,
    addDisabled,
}: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);

    const [selected, setSelected] = useState<number[]>([]);
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    const handleDaySelect = (id: number) =>
        setSelected(p => (p?.includes(id) ? p?.filter(d => d !== id) : [...p, id]));

    useEffect(() => {
        if (currentSchedule.days.length > 0) {
            setSelected(currentSchedule?.days);
            setFrom(currentSchedule?.hours?.from);
            setTo(currentSchedule?.hours?.to);
        }
    }, [currentSchedule?.days, currentSchedule?.hours?.from, currentSchedule?.hours?.to]);

    useEffect(() => {
        const newSchedule = {
            ...currentSchedule,
            days: selected,
            hours: { from, to },
        };

        updateSchedule(newSchedule);
    }, [from, selected, to]);

    const timeArrayTo = timeArray.slice(timeArray.indexOf(from) + 1);

    return (
        <WeekBox>
            <DayList>
                {(isMobile ? shortWeekDays : weekDays).map(({ name, id }) => (
                    <li key={id}>
                        <Button
                            disabled={currentSchedule.disabledDays?.includes(id)}
                            $colors={selected?.includes(id) ? 'accent' : 'light'}
                            onClick={() => handleDaySelect(id)}
                            size={isMobile ? 's' : 'm'}
                        >
                            {name}
                        </Button>
                    </li>
                ))}
            </DayList>

            <TimeWithButtonBox>
                <TimeBox>
                    <Time>
                        {/* {!isMobile && <span>{translateWorkSchedule('from')}</span>} */}

                        <CustomFormSelect
                            selectItems={timeArray.map(value => ({ value }))}
                            selectedItem={{ value: from }}
                            handleSelect={item => setFrom(item.value)}
                            visibleItemsCount={3}
                        />
                    </Time>

                    <Time>
                        {/* {!isMobile && <span>{translateWorkSchedule('to')}</span>} */}
                        {!isMobile && <span> - </span>}

                        <CustomFormSelect
                            selectItems={timeArrayTo.map(value => ({ value }))}
                            selectedItem={{ value: to }}
                            handleSelect={item => setTo(item.value)}
                            visibleItemsCount={3}
                        />
                    </Time>
                </TimeBox>

                <Button
                    disabled={
                        (currentSchedule.id === 1 && schedules.length === 7) ||
                        (currentSchedule.id === 1 && addDisabled) ||
                        (currentSchedule.id === 1 && !selected.length && !from && !to)
                    }
                    onClick={() => {
                        currentSchedule.id === 1 ? addSchedule() : removeSchedule(currentSchedule);
                    }}
                    Icon={currentSchedule.id > 1 ? HiTrash : HiPlus}
                    $colors={currentSchedule.id > 1 ? 'light' : 'accent'}
                    $round
                />
            </TimeWithButtonBox>
        </WeekBox>
    );
};

export default SetWorkSchedule;
