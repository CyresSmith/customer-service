import Button from 'components/Ui/Buttons/Button';
import Checkbox from 'components/Ui/Form/Checkbox';
import Select from 'components/Ui/Select';
import generateTimeArray from 'helpers/generateTimeArray';
import { useAdminRights, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'react-toastify';
import {
  useDeleteEmployeeScheduleMutation,
  useUpdateEmployeeScheduleMutation,
} from 'services/schedules.api';
import { IEmployee } from 'services/types/employee.types';
import { IDaySchedule, IMonthSchedule } from 'services/types/schedule.types';
import { IWorkingHours } from 'store/company/company.types';
import {
  ButtonsBox,
  Message,
  ScheduleSection,
  SelectBox,
  SelectDaysBox,
  SelectionBox,
  Title,
} from './ScheduleTimeSelection.styled';

type Props = {
  selectedDays: number[];
  employee: IEmployee;
  resetState: () => void;
  selectedMonthPassed: boolean;
  year: number;
  month: number;
  employeeSchedule?: IMonthSchedule;
  scheduleState: IDaySchedule[];
  setScheduleState: Dispatch<SetStateAction<IDaySchedule[]>>;
  selectedDayCompanySchedule?: IWorkingHours;
};

const ScheduleTimeSelection = ({
  selectedDays,
  employee,
  resetState,
  selectedMonthPassed,
  year,
  month,
  employeeSchedule,
  scheduleState,
  setScheduleState,
  selectedDayCompanySchedule,
}: Props) => {
  const isAdmin = useAdminRights();
  const { user } = useAuth();
  const { id: companyId } = useCompany();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isBreak, setIsBreak] = useState(false);
  const [breakFrom, setBreakFrom] = useState('');
  const [breakTo, setBreakTo] = useState('');
  const [isStateChanged, setIsStateChanged] = useState(false);

  const isEditingAllowed =
    !selectedMonthPassed && (isAdmin || user?.id === employee?.user?.id);

  const [updateSchedule, { isLoading }] = useUpdateEmployeeScheduleMutation();
  const [deleteSchedule, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeScheduleMutation();

  const handleTimeSelect = (
    time: string | string[],
    id?: string | undefined
  ) => {
    if (typeof time !== 'string') return;

    if (id === 'from') setFrom(time);
    if (id === 'to') setTo(time);
    if (id === 'breakFrom') setBreakFrom(time);
    if (id == 'breakTo') setBreakTo(time);

    const key = id === 'from' || id === 'to' ? 'hours' : 'breakHours';
    const param = id === 'from' || id === 'breakFrom' ? 'from' : 'to';

    setScheduleState(p =>
      p.map(item =>
        !selectedDays.includes(item.day)
          ? item
          : { ...item, [key]: { ...item[key], [param]: time } }
      )
    );

    setIsStateChanged(true);
  };

  const timeArray = generateTimeArray();

  const timeArrayFrom = (start: string, end?: string) =>
    timeArray.filter(time =>
      end ? time >= start && time <= end : time >= start
    );

  const isTimeForBreak =
    from !== '' && to !== '' && to >= timeArray[timeArray.indexOf(from) + 3];

  const removeSelectedDaysBreakHours = () =>
    setScheduleState(p =>
      p.map(item => {
        if (!selectedDays.includes(item.day)) return item;

        const newItem = { ...item };
        delete newItem.breakHours;
        return newItem;
      })
    );

  const handleAddBreakHoursClick = () => {
    if (!isEditingAllowed) return;

    if (isBreak) {
      setIsBreak(false);
      setBreakFrom('');
      setBreakTo('');
      removeSelectedDaysBreakHours();
    } else {
      const breakHours = setBreakTime(from, to);

      if (breakHours) {
        setScheduleState(p =>
          p.map(item =>
            !selectedDays.includes(item.day) ? item : { ...item, ...breakHours }
          )
        );
      }
    }

    setIsStateChanged(true);
  };

  const setBreakTime = (workingHoursFrom: string, workingHoursTo: string) => {
    if (isTimeForBreak) {
      const breakTime = timeArrayFrom(workingHoursFrom, workingHoursTo);
      const breakFromIdx = Math.floor(breakTime.length / 2) - 1;
      const breakFrom = breakTime[breakFromIdx];
      const breakTo = breakTime[breakFromIdx + 1];

      setIsBreak(true);
      setBreakFrom(breakFrom);
      setBreakTo(breakTo);

      return { breakHours: { from: breakFrom, to: breakTo } };
    }
  };

  const handleResetClick = async () => {
    resetState();
    setScheduleState([]);

    let toastMessage: string = '';

    if (employeeSchedule && employeeSchedule.id) {
      if (selectedDays.length > 0) {
        const data = {
          year,
          month,
          schedule: scheduleState.filter(
            ({ day }) => !selectedDays.includes(day)
          ),
          employee: { id: employee.id },
        };

        const { message } = await updateSchedule({
          companyId,
          employeeId: employee.id,
          data,
        }).unwrap();

        if (message) {
          toastMessage = message;
        }
      } else {
        const { message } = await deleteSchedule({
          companyId,
          employeeId: employee.id,
          scheduleId: employeeSchedule.id,
        }).unwrap();

        if (message) {
          toastMessage = message;
        }
      }

      if (toastMessage !== '') {
        toast.success(toastMessage);
      }
      resetState();
    }
    setIsStateChanged(false);
  };

  const handleScheduleUpdate = async () => {
    const data: IMonthSchedule = {
      year,
      month,
      schedule: scheduleState,
      employee: { id: employee.id },
    };

    const { message } = await updateSchedule({
      companyId,
      employeeId: employee.id,
      data,
    }).unwrap();

    if (message) {
      resetState();
      setIsStateChanged(false);
      toast.success(message);
    }
  };

  useEffect(() => {
    if (!isTimeForBreak) {
      setIsBreak(false);
      setBreakFrom('');
      setBreakTo('');
      removeSelectedDaysBreakHours();
    }
  }, [isTimeForBreak]);

  return (
    <>
      <SelectionBox>
        {selectedDays.length > 0 ? (
          <>
            <ScheduleSection>
              <Title>Робочій час</Title>

              <SelectDaysBox>
                <SelectBox>
                  <p>з</p>
                  <Select
                    id="from"
                    selectedItem={from}
                    onSelect={handleTimeSelect}
                    $colors="light"
                    items={
                      selectedDayCompanySchedule
                        ? timeArrayFrom(
                            selectedDayCompanySchedule.hours.from,
                            selectedDayCompanySchedule.hours.to
                          )
                        : timeArray
                    }
                    disabled={!isEditingAllowed}
                  />
                </SelectBox>

                <SelectBox>
                  <p>до</p>
                  <Select
                    id="to"
                    selectedItem={to}
                    onSelect={handleTimeSelect}
                    $colors="light"
                    items={
                      selectedDayCompanySchedule
                        ? timeArrayFrom(
                            from
                              ? timeArray[timeArray.indexOf(from) + 1]
                              : timeArray[
                                  timeArray.indexOf(
                                    selectedDayCompanySchedule.hours.from
                                  ) + 1
                                ],
                            selectedDayCompanySchedule.hours.to
                          )
                        : timeArrayFrom(timeArray[timeArray.indexOf(from) + 1])
                    }
                    disabled={!isEditingAllowed || from === ''}
                  />
                </SelectBox>
              </SelectDaysBox>
            </ScheduleSection>

            <ScheduleSection>
              <Checkbox
                isChecked={isBreak}
                handleCheck={handleAddBreakHoursClick}
                name="break"
                isReadonly={!isTimeForBreak}
              />
              {isBreak && (
                <SelectDaysBox>
                  <SelectBox>
                    <p>з</p>

                    <Select
                      id="breakFrom"
                      selectedItem={breakFrom || ''}
                      onSelect={handleTimeSelect}
                      $colors="light"
                      items={timeArrayFrom(
                        timeArray[timeArray.indexOf(from) + 1],
                        timeArray[timeArray.indexOf(breakTo) - 1] ||
                          timeArray[timeArray.indexOf(to) - 1]
                      )}
                      disabled={!isEditingAllowed}
                    />
                  </SelectBox>

                  <SelectBox>
                    <p>до</p>

                    <Select
                      id="breakTo"
                      selectedItem={breakTo || ''}
                      onSelect={handleTimeSelect}
                      $colors="light"
                      items={timeArrayFrom(
                        timeArray[timeArray.indexOf(breakFrom) + 1] || '',

                        to
                          ? timeArray[timeArray.indexOf(to) - 1]
                          : selectedDayCompanySchedule
                          ? timeArray[
                              timeArray.indexOf(
                                selectedDayCompanySchedule.hours.to
                              ) - 1
                            ]
                          : ''
                      )}
                      disabled={!isEditingAllowed || breakFrom === ''}
                    />
                  </SelectBox>
                </SelectDaysBox>
              )}
            </ScheduleSection>
          </>
        ) : (
          <Message>Виберіть дні місяця для налаштування часу роботи.</Message>
        )}
      </SelectionBox>

      {isEditingAllowed && (
        <ButtonsBox>
          <Button
            onClick={handleResetClick}
            Icon={HiTrash}
            disabled={isLoading}
            $colors="light"
            $variant="text"
            isLoading={isDeleteLoading}
          >
            Скинути
          </Button>

          <Button
            isLoading={isLoading}
            onClick={handleScheduleUpdate}
            Icon={IoIosSave}
            disabled={!isStateChanged || isLoading}
            $colors="accent"
          >
            Зберегти
          </Button>
        </ButtonsBox>
      )}
    </>
  );
};

export default ScheduleTimeSelection;
