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
import { useNavigate } from 'react-router-dom';
import { useLoading } from 'hooks';

type Props = {
    date: Date;
    workingHours: IWorkingHours[] | null;
    employees: BasicEmployeeInfo[];
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    allSchedules: IMonthSchedule[] | null;
    companyId: number;
};

const RecordLog = ({ companyId, allSchedules, date, workingHours, employees, setDate }: Props) => {
    const chosenDay = new Date(date).getDay();
    const [startIndex, setStartIndex] = useState<number>(0);
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isGlobalLoading } = useLoading();

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

    const getCompanyDaySchedule = (): string[] | undefined => {
        if (!workingHours) {
            return;
        }

        const today = workingHours.find(wh => wh.days.includes(chosenDay));

        if (!today) {
            return;
        }

        const { from, to } = today.hours;

        const timeArray = generateTimeArray(true);

        return getSchedule(timeArray, from, to);
    };

    const chosenDayCompanySchedule = getCompanyDaySchedule();

    const providersToRender =
        employees.length > SCHEDULES_PER_PAGE
            ? employees.slice(startIndex, startIndex + SCHEDULES_PER_PAGE)
            : employees;

    const handleRedirectClick = (where: string): void => {
        switch (where) {
            case 'company':
                return navigate(`/${companyId}/profile`, { replace: true });
            case 'employees':
                return navigate(`/${companyId}/employees`);
            default:
                break;
        }
    };

    return (
        <Container>
            {!chosenDayCompanySchedule ? (
                <NoDataWrapper>
                    <NoSchedule>Не встановлено графік роботи компанії для обраного дня!</NoSchedule>
                    <Button
                        onClick={() => handleRedirectClick('company')}
                        $colors="light"
                        children="Перейти до профілю компанії"
                    />
                </NoDataWrapper>
            ) : allSchedules && providersToRender.length > 0 ? (
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
                            <TimeList side="left" workHours={chosenDayCompanySchedule} />
                            <ListsWrapper id="schedulesList" $columns={providersToRender.length}>
                                {providersToRender.map((provider, i) => (
                                    <RecordLogList
                                        schedules={allSchedules.filter(
                                            s => s.employee.id === provider.id
                                        )}
                                        companySchedule={chosenDayCompanySchedule}
                                        key={provider.id}
                                        date={date}
                                        last={i === providersToRender.length - 1}
                                    />
                                ))}
                            </ListsWrapper>
                            <TimeList side="right" workHours={chosenDayCompanySchedule} />
                        </SchedulesContainer>
                    </ScrollWrapper>
                </LeftWrapper>
            ) : (
                !allSchedules ||
                (allSchedules.length < 1 && !employees) ||
                (employees.length < 1 && !isGlobalLoading && (
                    <NoDataWrapper>
                        <NoSchedule>
                            Відсутні працівники з доступним графіком роботи на обраний день!
                        </NoSchedule>
                        <Button
                            onClick={() => handleRedirectClick('employees')}
                            $colors="light"
                            children="До списку співробітників"
                        />
                    </NoDataWrapper>
                ))
            )}
            <RightWrapper>
                <Calendar cellSize={30} date={date} setDate={setDate} />
            </RightWrapper>
        </Container>
    );
};

export default RecordLog;
