import { useCompany } from "hooks/useCompany";
import { List, ListItem, ServiceName, RightWrapper, ServiceTime, ServicePrice } from "./ChooseServices.styled";
import { millisecondsToTime } from "helpers/millisecondsToTime";

const ChooseServices = () => {
    const { services } = useCompany();

    return (
        <List>
            {services.map((s, i) =>
                <ListItem key={i}>
                    <ServiceName>{s.name}</ServiceName>
                    <RightWrapper>
                        <ServiceTime>{millisecondsToTime(s.duration)}</ServiceTime>
                        <ServicePrice>{ s.price + ' грн.' }</ServicePrice>
                    </RightWrapper>
                </ListItem>
            )}
        </List>
    )
};

export default ChooseServices;