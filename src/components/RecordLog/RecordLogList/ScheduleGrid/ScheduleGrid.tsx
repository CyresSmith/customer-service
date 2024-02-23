import { TimeGrid } from "./TimeGrid";
import { TimeList } from "./TimeList";
import { Container } from "./TimeList.styled"

type Props = {
    hours: string[],
};

const ScheduleGrid = ({ hours }: Props) => {
    return (
        <Container>
            <TimeList side="left" workHours={hours} />
            <TimeGrid hours={hours} />
            <TimeList side="right" workHours={hours} />
        </Container>
    )
};

export default ScheduleGrid;