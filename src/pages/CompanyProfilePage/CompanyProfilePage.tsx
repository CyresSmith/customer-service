import CompanyProfile from 'components/CompanyProfile/CompanyProfile';
import { Navigate, useParams } from 'react-router-dom';

type Props = {};

const CompanyProfilePage = (props: Props) => {
  const { companyId } = useParams();

  if (!companyId) {
    return <Navigate to="/" replace={true} />;
  } else {
    return <CompanyProfile companyId={companyId} />;
  }
};

export default CompanyProfilePage;
