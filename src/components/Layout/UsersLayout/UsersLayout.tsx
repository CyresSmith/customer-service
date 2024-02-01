import { useActions } from 'hooks';
import { Suspense, useEffect } from 'react';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useGetCompanyByIdQuery } from 'services/company.api';
import Sidebar from '../../Sidebar';
import { MainSection, OutletWrapper } from './UsersLayout.styled';

const UsersLayout = () => {
  const match = useMatch('/:companyId');
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { setCompany } = useActions();

  const { isSuccess, data, refetch } = useGetCompanyByIdQuery(companyId, {
    skip: !companyId,
  });

  useEffect(() => {
    if (!match) return;

    navigate('record-log', { replace: true });
  }, [companyId, match, navigate]);

  useEffect(() => {
    if (isSuccess && data) setCompany(data);
  }, [data, isSuccess, setCompany]);

  return (
    <MainSection>
      <Sidebar />
      <OutletWrapper>
        <Suspense fallback={null}>
          <Outlet context={{ refetchCompanyData: () => refetch() }} />
        </Suspense>
      </OutletWrapper>
    </MainSection>
  );
};

export default UsersLayout;
