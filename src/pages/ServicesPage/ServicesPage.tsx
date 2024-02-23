import Services from 'components/Services/Services';
import ServicesBar from 'components/Services/ServicesBar';
import PageContentLayout from 'components/Ui/PageContentLayout';

type Props = {};

const ServicesPage = (props: Props) => {
  return <PageContentLayout bar={<ServicesBar />} content={<Services />} />;
};

export default ServicesPage;
