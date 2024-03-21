import Employees from 'components/Employees';
import EmployeesBar from 'components/Employees/EmployeesBar';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useActions, useAuth } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useEffect } from 'react';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';

const EmployeesPage = () => {
  const { id: companyId } = useCompany();
  const { accessToken } = useAuth();
  const { setAllEmployees } = useActions();

  const { data, isSuccess } = useGetCompanyEmployeesQuery(+companyId, {
    skip: !companyId || !accessToken,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setAllEmployees(data);
    }
  }, [data, isSuccess, setAllEmployees])

  return <PageContentLayout bar={<EmployeesBar />} content={<Employees />} />;
};

export default EmployeesPage;
