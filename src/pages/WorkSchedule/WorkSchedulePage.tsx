import WorkSchedule from 'components/WorkSchedule';
import { Navigate, useParams } from 'react-router-dom';

const WorkSchedulePage = () => {
  const { companyId } = useParams();

  return companyId ? <WorkSchedule /> : <Navigate to="/" replace={true} />;
};

export default WorkSchedulePage;
