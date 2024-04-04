import { BasicEmployeeInfo } from 'services/types/employee.types';
import {
    Avatar,
    AvatarWrapper,
    EmployeeDaySchedule,
    ListItem,
    EmployeeName,
    InfoBox,
    NoAvatar,
} from './EmployeesInfoList.styled';
import { IMonthSchedule } from 'services/types/schedule.types';

type Props = {
    employee: BasicEmployeeInfo;
    last: boolean;
    date: Date;
    schedules: IMonthSchedule[];
};

export const EmployeesInfoListItem = ({ employee, last, date, schedules }: Props) => {
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
            <AvatarWrapper>
                {avatar ? <Avatar src={avatar} alt="Photo" /> : <NoAvatar>{firstName[0]}</NoAvatar>}
            </AvatarWrapper>
            <InfoBox>
                <EmployeeName>{lastName ? firstName + ' ' + lastName : firstName}</EmployeeName>
                <EmployeeDaySchedule>{`${chosenSchedule?.from && chosenSchedule?.to ? chosenSchedule.from + ' - ' + chosenSchedule.to : 'Не встановлено'}`}</EmployeeDaySchedule>
            </InfoBox>
        </ListItem>
    );
};
