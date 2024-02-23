import { useCompany } from "hooks/useCompany";
import { ListsWrapper, RecordContainer } from "./RecordLog.styled";
import RecordLogList from "./RecordLogList/RecordLogList";
import ScheduleGrid from "./RecordLogList/ScheduleGrid";
import { dayHours } from "./dayHours";

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
    {
        id: 1,
        days: [
            {
                day: 1,
                hours: {
                    from: '09:00',
                    to: '18:00'
                }
            },
            {
                day: 2,
                hours: {
                    from: '09:00',
                    to: '18:00'
                }
            }
        ]
    },
    {
        id: 2,
        days: [
            {
                day: 1,
                hours: {
                    from: '12:00',
                    to: '20:00'
                }
            },
            {
                day: 2,
                hours: {
                    from: '10:00',
                    to: '16:00'
                }
            }
        ]
    }
]

const RecordLog = () => {
    const { workingHours } = useCompany();

    if (workingHours === null) {
        return;
    }

    const getHoursArray = (): string[]=> {
        const { schedule } = workingHours[0];
        const { from, to } = schedule;
        
        return dayHours.filter(h => Number(h.split(':')[0]) >= Number(from.split(':')[0]) && Number(h.split(':')[0]) <= Number(to.split(':')[0]))
    };

    const schedule = getHoursArray();
    // const timeItems = Array.from({ length: schedule.length * 4 - 4 });

    return (
        <RecordContainer $columns={items.length}>
            <ScheduleGrid hours={schedule} />
            <ListsWrapper>
                {items.map((item, i) => <RecordLogList companySchedule={schedule} key={i} item={item.days[0]} />)}
            </ListsWrapper>
            
        </RecordContainer>
    )
};

export default RecordLog;