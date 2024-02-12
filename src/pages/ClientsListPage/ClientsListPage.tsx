import ClientsList from 'components/ClientsListPage/ClientsList/ClientsList';
import ClientsListBar from 'components/ClientsListPage/ClientsListBar';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useActions } from 'hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGetAllQuery } from 'services/clients.api';

const ClientsListPage = () => {
  const { companyId } = useParams();
  const { setClients } = useActions();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const { data, isSuccess, refetch } = useGetAllQuery(companyId, {
    skip: Boolean(!companyId),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setClients(data);
    }
  }, [data, isSuccess, setClients]);

  return (
    <PageContentLayout
      bar={
        <ClientsListBar refetchData={refetch} searchQuery={searchQuery} handleSearch={handleSearch} />
      }
      content={<ClientsList companyId={companyId} search={searchQuery} />}
    />
  );
};

export default ClientsListPage;
