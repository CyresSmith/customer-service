import { SelectItem } from 'components/Ui/Form/types';
import { millisecondsToTime } from 'helpers/millisecondsToTime';
import { useCompany } from 'hooks/useCompany';
import { IEmployee } from 'services/types/employee.types';
import { IService } from 'services/types/service.type';
import {
  List,
  ListItem,
  RightWrapper,
  ServiceName,
  ServicePrice,
  ServiceTime,
} from './ServicesList.styled';

type Props = {
  searchQuery: string;
  chosenCategory: SelectItem;
  chosenEmployee: IEmployee | null;
  setServices: React.Dispatch<
    React.SetStateAction<Partial<IService>[] | undefined>
  >;
  chosenServices: Partial<IService>[] | undefined;
};

const ServicesList = ({
  searchQuery,
  chosenCategory,
  chosenEmployee,
  setServices,
  chosenServices,
}: Props) => {
  const { services } = useCompany();
  const { id } = chosenCategory;

  const filteredByEmployee =
    chosenEmployee !== null
      ? services.filter(s => chosenEmployee.services.find(es => es.id === s.id))
      : services;

  const filteredByCategory =
    id !== 'start' && id !== 'all'
      ? filteredByEmployee.filter(s => s.category.id === id)
      : filteredByEmployee;

  const filteredServices = filteredByCategory.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceChoose = (service: Partial<IService>) => {
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
  );
};

export default ServicesList;
