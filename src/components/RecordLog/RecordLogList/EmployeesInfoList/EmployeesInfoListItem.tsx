import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { IMonthSchedule } from 'services/types/schedule.types';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { EmployeeDaySchedule, EmployeeName, InfoBox, ListItem } from './EmployeesInfoList.styled';

type Props = {
    employee: BasicEmployeeInfo;
    last: boolean;
    date: Date;
    schedules: IMonthSchedule[];
};

export const EmployeesInfoListItem = ({ employee, last, date, schedules }: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);

    const { lastName, firstName, avatar } = employee;

    const chosenDay = new Date(date).getDate();
    const chosenMonth = new Date(date).getMonth();
    const chosenYear = new Date(date).getFullYear();

    const chosenSchedule = schedules
        .filter(s => s.year === chosenYear && s.month === chosenMonth)[0]
        ?.schedule.find(sh => sh.day === chosenDay)?.hours
        ? schedules
              .filter(s => s.year === chosenYear && s.month === chosenMonth)[0]
              ?.schedule.find(sh => sh.day === chosenDay)?.hours
        : { from: '', to: '' };

    return (
        <ListItem $last={last}>
            {!isMobile && <ItemAvatar name={firstName + ' ' + lastName} avatar={avatar} />}
            <InfoBox>
                <EmployeeName>{firstName + ' ' + lastName}</EmployeeName>
                <EmployeeDaySchedule>{`${
                    chosenSchedule?.from && chosenSchedule?.to
                        ? chosenSchedule.from + ' - ' + chosenSchedule.to
                        : 'Не встановлено'
                }`}</EmployeeDaySchedule>
            </InfoBox>
        </ListItem>
    );
};
