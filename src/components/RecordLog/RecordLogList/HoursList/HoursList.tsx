import { Container, TableList, TableListItem } from "./HoursList.styled";
import { TimeList } from "./TimeList";

type Props = {
    workHours: string[];
};

const HoursList = ({ workHours }: Props) => {
    const tableArray = Array.from({ length: workHours.length * 4 - 4 });

    console.log(tableArray.length)

    return (
        <Container>
            <TimeList side='left' workHours={workHours} />
            <TableList>
                {tableArray.map((wh, i) => <TableListItem key={i} />)}
            </TableList>
            <TimeList side='rigth' workHours={workHours} />
        </Container>
    )
};

export default HoursList;