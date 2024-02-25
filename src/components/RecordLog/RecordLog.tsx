import { useCompany } from "hooks/useCompany";
import { ListsWrapper, NoSchedule, RecordContainer } from "./RecordLog.styled";
import RecordLogList from "./RecordLogList/RecordLogList";
import generateTimeArray, { getSchedule } from "helpers/generateTimeArray";
import TimeList from "./RecordLogList/TimeList";

// const items = [
//     {
//         id: 2,
//         days: [
//             {
//                 day: 1,
//                 hours: {
//                     from: '10:00',
//                     to: '16:00'
//                 },
//                 events: [
//                     {
//                         id: 1,
//                         time: {
//                             from: '11:00',
//                             to: '13:00'
//                         }
//                     },
//                     {
//                         id: 2,
//                         time: {
//                             from: '14:00',
//                             to: '15:00'
//                         }
//                     }
//                 ]
//             },
//             {
//                 day: 2,
//                 hours: {
//                     from: '10:00',
//                     to: '16:00'
//                 }
//             }
//         ]
//     },
//     {
//         id: 1,
//         days: [
//             {
//                 day: 1,
//                 hours: {
//                     from: '09:00',
//                     to: '18:00'
//                 },
//                 events: [
//                     {
//                         id: 1,
//                         time: {
//                             from: '09:30',
//                             to: '11:00'
//                         }
//                     },
//                     {
//                         id: 2,
//                         time: {
//                             from: '12:00',
//                             to: '13:30'
//                         }
//                     }
//                 ]
//             },
//             {
//                 day: 2,
//                 hours: {
//                     from: '09:00',
//                     to: '18:00'
//                 }
//             }
//         ]
//     },
//     {
//         id: 2,
//         days: [
//             {
//                 day: 1,
//                 hours: {
//                     from: '12:00',
//                     to: '20:00'
//                 },
//                 events: [
//                     {
//                         id: 1,
//                         time: {
//                             from: '12:00',
//                             to: '13:45'
//                         }
//                     },
//                     {
//                         id: 2,
//                         time: {
//                             from: '16:00',
//                             to: '17:30'
//                         }
//                     }
//                 ]
//             },
//             {
//                 day: 2,
//                 hours: {
//                     from: '10:00',
//                     to: '16:00'
//                 }
//             }
//         ]
//     }
//

type Props = {
    date: Date;
}

const RecordLog = ({date}: Props) => {
    const { workingHours, employees } = useCompany();
    const chosenDay = new Date(date).getDay();

    if (!workingHours) {
        return (
            <p>Не встановлено графік роботи компанії!</p>
        )
    }

    const today = workingHours.find(wh => wh.days.includes(chosenDay));

    console.log(today)

    if (!today) {
        return (
            <NoSchedule>Не встановлено графік роботи для обраного дня!</NoSchedule>
        )
    }

    const { from, to } = today!.hours;

    const timeArray = generateTimeArray(true);

    const providers = employees.filter(e => e.provider);
    const companyDaySchedule = getSchedule(timeArray, from, to);

    return workingHours && (
        <RecordContainer $columns={providers.length}>
            <TimeList side="left" workHours={companyDaySchedule} />
            <ListsWrapper>
                {providers.map(provider =>
                    <RecordLogList
                        companySchedule={companyDaySchedule}
                        key={provider.id}
                        schedules={provider.schedules ? provider.schedules : []}
                        date={date}
                />)}
            </ListsWrapper>
            <TimeList side="right" workHours={companyDaySchedule} />
        </RecordContainer>
    )
};

export default RecordLog;
