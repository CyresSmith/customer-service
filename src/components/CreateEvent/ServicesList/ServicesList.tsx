import { SelectItem } from 'components/Ui/Form/types';
import { millisecondsToTime } from 'helpers/millisecondsToTime';
// import { IEmployee } from 'services/types/employee.types';
import {
    List,
    ListItem,
    RightWrapper,
    ServiceName,
    ServicePrice,
    ServiceTime,
} from './ServicesList.styled';
import { ServiceBasicInfo } from 'services/types/service.type';

type Props = {
    searchQuery: string;
    chosenCategory: SelectItem;
    // chosenEmployee: IEmployee | null;
    setServices: React.Dispatch<React.SetStateAction<ServiceBasicInfo[] | undefined>>;
    chosenServices: ServiceBasicInfo[] | undefined;
    servicesList: ServiceBasicInfo[];
};

const ServicesList = ({
    searchQuery,
    chosenCategory,
    // chosenEmployee,
    setServices,
    chosenServices,
    servicesList,
}: Props) => {
    const { id } = chosenCategory;

    const filteredByCategory =
        servicesList && id !== 'start' && id !== 'all'
            ? servicesList.filter(s => s.category.id === id)
            : servicesList;

    const filteredServices =
        filteredByCategory &&
        filteredByCategory.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleServiceChoose = (service: ServiceBasicInfo): void => {
        setServices(s => {
            if (s) {
                if (s.find(ss => ss.id === service.id)) {
                    return s.filter(ss => ss.id !== service.id);
                } else {
                    return [...s, service];
                }
            } else {
                return [service];
            }
        });
    };

    const isChosen = (id: number) => {
        if (chosenServices?.find(cs => cs.id === id)) {
            return true;
        } else {
            return false;
        }
    };

    return (
        filteredServices && (
            <List>
                {filteredServices.map((s, i) => (
                    <ListItem
                        $chosen={isChosen(s.id)}
                        key={i}
                        onClick={() => handleServiceChoose(s)}
                    >
                        <ServiceName>{s.name}</ServiceName>
                        <RightWrapper>
                            <ServiceTime>{millisecondsToTime(s.duration)}</ServiceTime>
                            <ServicePrice>{s.price + ' грн.'}</ServicePrice>
                        </RightWrapper>
                    </ListItem>
                ))}
            </List>
        )
    );
};

export default ServicesList;
