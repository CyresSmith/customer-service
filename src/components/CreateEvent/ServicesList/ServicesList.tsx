import { SelectItem } from 'components/Ui/Form/types';
import { List, ListItem, ServiceName, RightWrapper, ServiceTime, ServicePrice } from './ServicesList.styled';
import { millisecondsToTime } from "helpers/millisecondsToTime";
import { useCompany } from "hooks/useCompany";
import { IEmployee } from 'services/types/employee.types';

type Props = {
    searchQuery: string;
    chosenCategory: SelectItem;
    chosenEmployee: IEmployee | null;
};

const ServicesList = ({ searchQuery, chosenCategory, chosenEmployee }: Props) => {
    const { services } = useCompany();
    const { id } = chosenCategory;

    const filteredByEmployee = chosenEmployee !== null ? services.filter(s => chosenEmployee.services.find(es => es.id === s.id)) : services;

    const filteredByCategory = id !== 'start' && id !== 'all' ? filteredByEmployee.filter(s => s.category.id === id) : filteredByEmployee;

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