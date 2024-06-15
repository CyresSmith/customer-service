import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import {
    format,
    getDate,
    getDay,
    getDaysInMonth,
    isPast,
    isSameDay,
    isThisMonth,
    isToday,
} from 'date-fns';

import { NoDataWrapper, NoSchedule } from 'components/RecordLog/RecordLog.styled';
import Button from 'components/Ui/Buttons/Button';
import { AvatarSize } from 'components/Ui/ItemsList/ItemsList.styled';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { EmployeeBasicInfo } from 'services/types/employee.types';
import { IMonthSchedule } from 'services/types/schedule.types';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import {
    Container,
    Day,
    DayBox,
    DayBreak,
    DayDate,
    DayDateBox,
    DayName,
    Employee,
    EmployeesList,
    HeaderBox,
    HeaderButtonBox,
    HeaderDay,
    HeaderRowBox,
    Name,
    RowBox,
    SchedulesBox,
    SchedulesListBox,
    Today,
    WorkHours,
    WorkScheduleBox,
} from './WorkSchedule.styled';
import { SelectedDays } from './types';

type Props = {
    providers: EmployeeBasicInfo[];
    selectedMonth: Date;
    selectedDays: SelectedDays[];
    scheduleState: IMonthSchedule[];
    monthDays: Date[];
    isEditingAllowed: boolean;
    isNotWorkingDay: (date: Date) => boolean;
    handleHeaderDateClick: (date: Date) => void;
    handleEmployeeClick: (id: number) => void;
    handleDaySelect: (date: Date, id: number) => void;
};

const WorkSchedule = ({
    providers,
    selectedMonth,
    selectedDays,
    scheduleState,
    monthDays,
    isEditingAllowed,
    isNotWorkingDay,
    handleHeaderDateClick,
    handleEmployeeClick,
    handleDaySelect,
}: Props) => {
    const { id, workingHours } = useCompany();

    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);
    const isTablet = useMediaQuery(theme.breakpoints.tablet.media);

    const [visibleDaysCount, setVisibleDaysCount] = useState(isMobile ? 2 : 8);
    const [visibleDays, setVisibleDays] = useState<{ start: number; end: number }>({
        start: 0,
        end: visibleDaysCount,
    });

    const todayDate = new Date(Date.now()).getDate();
    const monthDaysCount = getDaysInMonth(selectedMonth);

    const nextDaysSelect = () =>
        setVisibleDays(p => ({
            start: visibleDaysCount + p.start,
            end: visibleDaysCount + p.end,
        }));

    const prevDaysSelect = () =>
        setVisibleDays(p => ({
            start: p.start - visibleDaysCount < 0 ? 0 : p.start - visibleDaysCount,
            end: p.start - visibleDaysCount < 0 ? visibleDaysCount : p.end - visibleDaysCount,
        }));

    useEffect(() => {
        setVisibleDaysCount(isMobile ? 2 : 8);
        setVisibleDays(p => {
            const start = p.start < 0 ? 0 : p.start;
            const end = p.start < 0 ? (isMobile ? 2 : 8) : p.start + (isMobile ? 2 : 8);

            return { start, end };
        });
    }, [isMobile, isDesktop, isTablet]);

    useEffect(() => {
        const currentDayIndex = monthDays.map(date => date.getDate()).indexOf(todayDate);

        const startIndex = Math.floor(currentDayIndex / visibleDaysCount) * visibleDaysCount;

        const sliceSegment = isThisMonth(selectedMonth)
            ? { start: startIndex, end: startIndex + visibleDaysCount }
            : { start: 0, end: visibleDaysCount };

        setVisibleDays(sliceSegment);
    }, [selectedMonth]);

    return !providers.length ? (
        <NoDataWrapper>
            <NoSchedule>Перелік співробітників порожній!</NoSchedule>
            <Button
                onClick={() => navigate('employees')}
                $colors="light"
                children="Перейти до налаштування співробітників"
            />
        </NoDataWrapper>
    ) : (
        <Container $isEditable={providers.length > 0 && isEditingAllowed}>
            <WorkScheduleBox>
                <HeaderBox>
                    <HeaderButtonBox>
                        <Button
                            disabled={visibleDays.start === 0}
                            onClick={prevDaysSelect}
                            Icon={HiArrowLeft}
                            $colors="accent"
                            $round
                        />
                    </HeaderButtonBox>

                    <HeaderRowBox key={id} $daysCount={visibleDaysCount}>
                        {monthDays.slice(visibleDays.start, visibleDays.end).map((item, i) => {
                            const hours = workingHours?.find(({ days }) =>
                                days.includes(getDay(item))
                            );

                            const today = isToday(item);
                            const isNotWorking = isNotWorkingDay(item) || (!today && isPast(item));

                            return (
                                <HeaderDay
                                    onClick={() => handleHeaderDateClick(item)}
                                    key={i}
                                    $isNotWorkingDay={isNotWorking}
                                    $isToday={today}
                                >
                                    <DayDateBox $isNotWorkingDay={isNotWorking} $isToday={today}>
                                        <DayDate>{getDate(item)}</DayDate>
                                        <DayName>{format(item, 'EEEE')}</DayName>
                                    </DayDateBox>

                                    {hours && (
                                        <WorkHours $isToday={today}>
                                            <span>{hours.hours.from}</span>
                                            {isDesktop && <span>{' - '}</span>}
                                            <span>{hours.hours.to}</span>
                                        </WorkHours>
                                    )}

                                    {isThisMonth(selectedMonth) && today && (
                                        <Today
                                            $daysCount={visibleDaysCount}
                                            $left={todayDate - (visibleDays.start + 1)}
                                            $employeesCount={providers.length}
                                        />
                                    )}
                                </HeaderDay>
                            );
                        })}
                    </HeaderRowBox>

                    <HeaderButtonBox>
                        <Button
                            disabled={visibleDays.end >= monthDaysCount}
                            onClick={nextDaysSelect}
                            Icon={HiArrowRight}
                            $colors="accent"
                            $round
                        />
                    </HeaderButtonBox>
                </HeaderBox>

                <SchedulesBox>
                    <EmployeesList $employeesCount={providers.length}>
                        {providers.map(({ id, avatar, firstName }) => (
                            <Employee key={id} onClick={() => handleEmployeeClick(id)}>
                                <ItemAvatar
                                    avatar={avatar}
                                    name={firstName}
                                    size={isMobile ? AvatarSize.S : AvatarSize.M}
                                />

                                {!isMobile && <Name>{firstName}</Name>}
                            </Employee>
                        ))}
                    </EmployeesList>

                    <SchedulesListBox $daysCount={visibleDaysCount}>
                        {providers.map(({ id }) => {
                            const employeeSchedule = scheduleState?.find(
                                schedule => schedule?.employee.id === id
                            );

                            return (
                                <RowBox
                                    key={id}
                                    $daysCount={visibleDaysCount}
                                    $employeesCount={providers.length}
                                >
                                    {monthDays
                                        .slice(visibleDays.start, visibleDays.end)
                                        .map((item, i) => {
                                            const isSelected =
                                                selectedDays?.findIndex(
                                                    selected =>
                                                        selected?.employeeId === id &&
                                                        selected?.dates?.findIndex(selected =>
                                                            isSameDay(selected, item)
                                                        ) !== -1
                                                ) !== -1;

                                            const daySchedule = employeeSchedule?.schedule.find(
                                                schedule => schedule?.day === getDate(item)
                                            );

                                            const today = isToday(item);

                                            const isNotWorking =
                                                isNotWorkingDay(item) || (!today && isPast(item));

                                            return (
                                                <Day
                                                    $isNotWorkingDay={isNotWorking}
                                                    onClick={() => handleDaySelect(item, id)}
                                                    key={i}
                                                >
                                                    <DayBox
                                                        $isNotWorkingDay={isNotWorking}
                                                        $selected={isSelected}
                                                    >
                                                        {daySchedule && (
                                                            <>
                                                                <span>
                                                                    {daySchedule.hours.from}
                                                                </span>
                                                                {daySchedule.breakHours && (
                                                                    <DayBreak
                                                                        $selected={isSelected}
                                                                    >
                                                                        <span>
                                                                            {
                                                                                daySchedule
                                                                                    .breakHours.from
                                                                            }
                                                                        </span>
                                                                        {isDesktop && (
                                                                            <span>{'-'}</span>
                                                                        )}
                                                                        <span>
                                                                            {
                                                                                daySchedule
                                                                                    .breakHours.to
                                                                            }
                                                                        </span>
                                                                    </DayBreak>
                                                                )}
                                                                <span>{daySchedule.hours.to}</span>
                                                            </>
                                                        )}
                                                    </DayBox>
                                                </Day>
                                            );
                                        })}
                                </RowBox>
                            );
                        })}
                    </SchedulesListBox>

                    <EmployeesList $employeesCount={providers.length}>
                        {providers.map(({ id, avatar, firstName }) => (
                            <Employee key={id} onClick={() => handleEmployeeClick(id)}>
                                <ItemAvatar
                                    avatar={avatar}
                                    name={firstName}
                                    size={isMobile ? AvatarSize.S : AvatarSize.M}
                                />

                                {!isMobile && <Name>{firstName}</Name>}
                            </Employee>
                        ))}
                    </EmployeesList>
                </SchedulesBox>
            </WorkScheduleBox>
        </Container>
    );
};

export default WorkSchedule;
