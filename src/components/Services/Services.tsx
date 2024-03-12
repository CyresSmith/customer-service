import { useCompany } from 'hooks/useCompany';

type Props = {};

const Services = (props: Props) => {
  const { services } = useCompany();

  return (
    <div>
      {services && services?.length > 0 && (
        <ul>
          {services?.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Services;
