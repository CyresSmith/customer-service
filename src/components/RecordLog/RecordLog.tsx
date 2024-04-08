import Button from 'components/Ui/Buttons/Button';
import Calendar from 'components/Ui/Calendar/Calendar';
import { SCHEDULES_PER_PAGE } from 'helpers/constants';
import generateTimeArray, { getSchedule } from 'helpers/generateTimeArray';
import { useLayoutEffect, useState } from 'react';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { IWorkingHours } from 'store/company/company.types';
import {
    BtnWrapper,
    Container,
    EmployeesListWrapper,
    LeftWrapper,
    ListsWrapper,
    NoDataWrapper,
    NoSchedule,
    RightWrapper,
    SchedulesContainer,
    ScrollWrapper,
} from './RecordLog.styled';
import EmployeesInfoList from './RecordLogList/EmployeesInfoList/EmployeesInfoList';
import RecordLogList from './RecordLogList/RecordLogList';
import TimeList from './RecordLogList/TimeList';
import { IMonthSchedule } from 'services/types/schedule.types';
// import { useNavigate } from 'react-router-dom';

type Props = {
    date: Date;
    workingHours: IWorkingHours[] | null;
    employees: BasicEmployeeInfo[];
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    allSchedules: IMonthSchedule[];
};

const RecordLog = ({ allSchedules, date, workingHours, employees, setDate }: Props) => {
    const chosenDay = new Date(date).getDay();
    const [startIndex, setStartIndex] = useState<number>(0);
    const [isScroll, setIsScroll] = useState<boolean>(false);
    // const navigate = useNavigate();

    useLayoutEffect(() => {
        const schedulesListElementHeight = document.getElementById('schedulesList')?.offsetHeight;
        const schedulesContainerElementHeight =
            document.getElementById('schedulesContainer')?.offsetHeight;

        if (
            schedulesListElementHeight === undefined ||
            schedulesContainerElementHeight === undefined
        ) {
            return;
        }

        setIsScroll(schedulesListElementHeight > schedulesContainerElementHeight);
    }, [employees]);

    if (!workingHours) {
        return (
            <NoDataWrapper>
                <NoSchedule>Не встановлено графік роботи компанії для обраного дня!</NoSchedule>
                <Button $colors="light" children="Перейти до профілю компанії" />
            </NoDataWrapper>
        );
    }

    const todayCompanySchedule =
        workingHours && workingHours.find(wh => wh.days.includes(chosenDay));

    const { from, to } = todayCompanySchedule!.hours;

    const timeArray = generateTimeArray(true);

    const companyDaySchedule = getSchedule(timeArray, from, to);

    const providersToRender =
        employees.length > SCHEDULES_PER_PAGE
            ? employees.slice(startIndex, startIndex + SCHEDULES_PER_PAGE)
            : employees;

    return (
        <Container>
            {providersToRender &&
            providersToRender.length > 0 &&
            allSchedules &&
            allSchedules.length > 0 ? (
                <LeftWrapper>
                    <EmployeesListWrapper>
                        {startIndex !== 0 && employees.length > SCHEDULES_PER_PAGE && (
                            <BtnWrapper $left="10px">
                                <Button
                                    onClick={() => setStartIndex(s => s - 1)}
                                    size="l"
                                    $round={true}
                                    $colors="transparent"
                                    Icon={HiArrowCircleLeft}
                                />
                            </BtnWrapper>
                        )}
                        <EmployeesInfoList
                            isScroll={isScroll}
                            columns={providersToRender.length}
                            date={date}
                            employees={providersToRender}
                            schedules={allSchedules}
                        />
                        {employees.length > SCHEDULES_PER_PAGE &&
                            employees[employees.length - 1] !==
                                providersToRender[providersToRender.length - 1] && (
                                <BtnWrapper $right="10px">
                                    <Button
                                        onClick={() => setStartIndex(s => s + 1)}
                                        size="l"
                                        $round={true}
                                        $colors="transparent"
                                        Icon={HiArrowCircleRight}
                                    />
                                </BtnWrapper>
                            )}
                    </EmployeesListWrapper>
                    <ScrollWrapper id="schedulesContainer">
                        <SchedulesContainer>
                            <TimeList side="left" workHours={companyDaySchedule} />
                            <ListsWrapper id="schedulesList" $columns={providersToRender.length}>
                                {providersToRender.map((provider, i) => (
                                    <RecordLogList
                                        schedules={allSchedules.filter(
                                            s => s.employee.id === provider.id
                                        )}
                                        companySchedule={companyDaySchedule}
                                        key={provider.id}
                                        date={date}
                                        last={i === providersToRender.length - 1}
                                    />
                                ))}
                            </ListsWrapper>
                            <TimeList side="right" workHours={companyDaySchedule} />
                        </SchedulesContainer>
                    </ScrollWrapper>
                </LeftWrapper>
            ) : (
                <NoDataWrapper>
                    <NoSchedule>
                        Відсутні працівники з доступним графіком роботи на обраний день!
                    </NoSchedule>
                    <Button $colors="light" children="До списку співробітників" />
                </NoDataWrapper>
            )}
            <RightWrapper>
                <Calendar cellSize={30} date={date} setDate={setDate} />
            </RightWrapper>
        </Container>
    );
};

export default RecordLog;
