import translateWorkSchedule from 'helpers/translateWorkSchedule';
import { IWorkingHours } from 'store/company/company.types';

type Props = {
    schedule: IWorkingHours;
};

const Schedule = ({ schedule }: Props) => {
    return (
        <ul>
            {Object.entries(schedule).map(([day, schedule]) => (
                <li>
                    <p>
                        <span>{translateWorkSchedule(day)}</span>
                        {Object.entries(schedule).map(([type, time]) => (
                            <>
                                <span>{translateWorkSchedule(type)}</span>
                                <span>{time}</span>
                            </>
                        ))}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default Schedule;
