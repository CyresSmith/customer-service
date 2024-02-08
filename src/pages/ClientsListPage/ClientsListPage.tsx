import ClientsListBar from 'components/ClientsListPage/ClientsListBar';
import PageContentLayout from 'components/Ui/PageContentLayout';

const ClientsListPage = () => {
  return <PageContentLayout bar={<ClientsListBar />} content={<></>} />;
};

export default ClientsListPage;
