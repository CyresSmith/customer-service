import { RecordContainer } from "./RecordLog.styled";
import HoursList from "./RecordLogList/HoursList";
import RecordLogList from "./RecordLogList/RecordLogList";

const workHours = Array.from({length: 20});

const RecordLog = () => {
    return (
        <RecordContainer>
            <HoursList workHours={workHours} />
            <RecordLogList workHours={workHours} />
        </RecordContainer>
    )
};

export default RecordLog;