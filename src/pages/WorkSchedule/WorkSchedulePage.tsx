import Loader from 'components/Ui/Loader';
import PageContentLayout from 'components/Ui/PageContentLayout';
import WorkSchedule from 'components/WorkSchedule';
import WorkScheduleBar from 'components/WorkSchedule/WorkScheduleBar';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
import { useGetCompanyEmployeesQuery } from 'services/employee.api';
import { EmployeeStatusEnum } from 'services/types/employee.types';

const WorkSchedulePage = () => {
    const { id: companyId } = useCompany();
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date(Date.now()));

    const { data: employees } = useGetCompanyEmployeesQuery(companyId, {
        skip: !companyId,
        refetchOnMountOrArgChange: true,
    });

    const providers = employees?.filter(
        ({ provider, status }) => provider && status === EmployeeStatusEnum.WORKING
    );

    const providersForRender = providers?.filter(({ id }) => selectedProviders.includes(id));

    useEffect(() => {
        if (!employees) return;

        providers && setSelectedProviders(providers.map(({ id }) => id));
    }, [employees]);

    return (
        <PageContentLayout
            bar={
                <WorkScheduleBar
                    setSelectedProviders={setSelectedProviders}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
            }
            content={
                providersForRender && providersForRender.length > 0 ? (
                    <WorkSchedule selectedMonth={selectedMonth} providers={providersForRender} />
                ) : (
                    <Loader />
                )
            }
        />
    );
};

export default WorkSchedulePage;
