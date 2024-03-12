import Services from 'components/Services/Services';
import ServicesBar from 'components/Services/ServicesBar';
import PageContentLayout from 'components/Ui/PageContentLayout';

const ServicesPage = () => {
  return <PageContentLayout bar={<ServicesBar />} content={<Services />} />;
};

export default ServicesPage;
