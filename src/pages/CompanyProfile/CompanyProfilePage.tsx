import CompanyProfile from 'components/CompanyProfile/CompanyProfile';
import { Navigate, useParams } from 'react-router-dom';

const CompanyProfilePage = () => {
  const { companyId } = useParams();

  return companyId ? <CompanyProfile /> : <Navigate to="/" replace={true} />;
};

export default CompanyProfilePage;
