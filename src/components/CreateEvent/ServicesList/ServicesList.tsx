import { SelectItem } from 'components/Ui/Form/types';
import { List, ListItem, ServiceName, RightWrapper, ServiceTime, ServicePrice } from './ServicesList.styled';
import { millisecondsToTime } from "helpers/millisecondsToTime";
import { useCompany } from "hooks/useCompany";

type Props = {
    searchQuery: string;
    chosenCategory: SelectItem;
};

const ServicesList = ({ searchQuery, chosenCategory }: Props) => {
    const { services } = useCompany();
    const { id } = chosenCategory;

    const filteredByCategory = id !== 'start' && id !== 'all' ? services.filter(s => s.category.id === id) : services;

    const filteredServices = filteredByCategory.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <List>
            {filteredServices.map((s, i) =>
                <ListItem key={i}>
                    <ServiceName>{s.name}</ServiceName>
                    <RightWrapper>
                        <ServiceTime>{millisecondsToTime(s.duration)}</ServiceTime>
                        <ServicePrice>{s.price + ' грн.'}</ServicePrice>
                    </RightWrapper>
                </ListItem>
            )}
        </List>
    )
};

export default ServicesList;