import { useActions, useAuth } from 'hooks';
import { Suspense, useEffect } from 'react';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useGetCompanyByIdQuery } from 'services/company.api';
import Sidebar from '../../Sidebar';
import { MainSection, OutletWrapper } from './UsersLayout.styled';

const UsersLayout = () => {
    const match = useMatch('/:companyId');
    const navigate = useNavigate();
    const { companyId } = useParams();
    const { setCompany, setUserRole } = useActions();
    const { user } = useAuth();

    const { data, isError } = useGetCompanyByIdQuery(
        { companyId },
        {
            skip: !companyId || !user,
        }
    );

    useEffect(() => {
        if (!match) return;

        navigate('record-log', { replace: true });
    }, [companyId, match, navigate]);

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError]);

    useEffect(() => {
        if (data) {
            setCompany(data);

            if (user && user.id) {
                const role = data.employees.find(item => item.user.id === user.id)?.role;

                role && setUserRole(role);
            }
        }
    }, [data, setCompany, setUserRole, user]);

    return (
        <MainSection>
            <Sidebar />
            <OutletWrapper>
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </OutletWrapper>
        </MainSection>
    );
};

export default UsersLayout;
