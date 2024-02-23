import { useCompany } from "hooks/useCompany";
import { ListsWrapper, RecordContainer } from "./RecordLog.styled";
import RecordLogList from "./RecordLogList/RecordLogList";
import generateTimeArray, { getSchedule } from "helpers/generateTimeArray";
import TimeList from "./RecordLogList/TimeList";

const items = [
    {
        id: 2,
        days: [
            {
                day: 1,
                hours: {
                    from: '10:00',
                    to: '16:00'
                },
                events: [
                    {
                        id: 1,
                        time: {
                            from: '11:00',
                            to: '13:00'
                        }
                    },
                    {
                        id: 2,
                        time: {
                            from: '14:00',
                            to: '15:00'
                        }
                    }
                ]
            },
            {
                day: 2,
                hours: {
                    from: '10:00',
                    to: '16:00'
                }
            }
        ]
    },
    // {
    //     id: 1,
    //     days: [
    //         {
    //             day: 1,
    //             hours: {
    //                 from: '09:00',
    //                 to: '18:00'
    //             }
    //         },
    //         {
    //             day: 2,
    //             hours: {
    //                 from: '09:00',
    //                 to: '18:00'
    //             }
    //         }
    //     ]
    // },
    // {
    //     id: 2,
    //     days: [
    //         {
    //             day: 1,
    //             hours: {
    //                 from: '12:00',
    //                 to: '20:00'
    //             }
    //         },
    //         {
    //             day: 2,
    //             hours: {
    //                 from: '10:00',
    //                 to: '16:00'
    //             }
    //         }
    //     ]
    // }
]

const RecordLog = () => {
    const { workingHours } = useCompany();

    if (!workingHours) {
        return;
    }

    const { hours } = workingHours[0];
    const { from, to } = hours;

    const timeArray = generateTimeArray(true);

    const companyDaySchedule = getSchedule(timeArray, from, to);

    return workingHours && (
        <RecordContainer $columns={items.length}>
            <TimeList side="left" workHours={companyDaySchedule} />
            <ListsWrapper>
                {items.map((item, i) => <RecordLogList companySchedule={companyDaySchedule} key={i} item={item.days[0]} />)}
            </ListsWrapper>
            <TimeList side="right" workHours={companyDaySchedule} />
        </RecordContainer>
    )
};

export default RecordLog;
