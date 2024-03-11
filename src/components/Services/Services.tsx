import { useCompany } from 'hooks/useCompany';
import { useGetServicesQuery } from 'services/company.api';

type Props = {};

const Services = (props: Props) => {
  const { id } = useCompany();

  const { data, isLoading } = useGetServicesQuery({ id }, { skip: !id });

  return (
    <div>
      {data && data?.length > 0 && (
        <ul>
          {data?.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Services;
