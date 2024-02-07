import Employees from 'components/Employees';
import EmployeesBar from 'components/Employees/EmployeesBar';
import PageContentLayout from 'components/Ui/PageContentLayout';

const EmployeesPage = () => {
  return <PageContentLayout bar={<EmployeesBar />} content={<Employees />} />;
};

export default EmployeesPage;
