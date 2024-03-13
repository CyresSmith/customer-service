import { ServiceOpenModal } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { ItemBox, List, Name } from './Services.styled';

type Props = {
  handleModalOpen: (type: ServiceOpenModal | null, serviceId?: number) => void;
};

const Services = ({ handleModalOpen }: Props) => {
  const { services } = useCompany();

  return (
    <>
      {services && services.length > 0 && (
        <List>
          {services.map(item => (
            <ItemBox
              key={item.id}
              onClick={() =>
                handleModalOpen(ServiceOpenModal.EDIT_SERVICE, item.id)
              }
            >
              <Name>{item.name}</Name>
            </ItemBox>
          ))}
        </List>
      )}
    </>
  );
};

export default Services;
