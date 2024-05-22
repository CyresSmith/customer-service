import ServiceModal from 'components/Services/ServiceModal';
import ItemsList from 'components/Ui/ItemsList';
import { ServiceOpenModal } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useState } from 'react';
import { useGetEmployeeServicesQuery } from 'services/service.api';
import { IEmployee } from 'services/types/employee.types';
import { ServiceBasicInfo } from 'services/types/service.type';
import { Container } from './ChooseServices.styled';

type Props = {
    chosenEmployee: IEmployee;
    setServices: Dispatch<SetStateAction<ServiceBasicInfo[]>>;
    chosenServices: ServiceBasicInfo[];
};

const ChooseServices = ({ chosenEmployee, setServices, chosenServices }: Props) => {
    const { id: companyId } = useCompany();
    const [openModal, setOpenModal] = useState<ServiceOpenModal | null>(null);

    const { data: employeeServices, isLoading } = useGetEmployeeServicesQuery({
        companyId,
        employeeId: chosenEmployee.id,
    });

    const handleServiceSelect = (serviceId: number) => {
        const service = employeeServices?.find(({ id }) => id === serviceId);

        if (service) {
            setServices(p =>
                p.find(({ id }) => id === serviceId)
                    ? p.filter(({ id }) => id !== serviceId)
                    : [...p, service]
            );
        }
    };

    return (
        <>
            <Container>
                {!isLoading && employeeServices && (
                    <ItemsList
                        items={employeeServices.map(({ avatar, id, name, category }) => ({
                            avatar,
                            id,
                            name,
                            category: category.name,
                        }))}
                        onItemClick={handleServiceSelect}
                        selection={chosenServices?.map(({ id }) => id) || []}
                        keyForSelect="category"
                        addButtonTitle="Додати послугу"
                        onAddClick={() => {
                            setOpenModal(ServiceOpenModal.ADD);
                        }}
                    />
                )}
            </Container>

            {openModal && (
                <ServiceModal openModal={openModal} handleModalClose={() => setOpenModal(null)} />
            )}
        </>
    );
};

export default ChooseServices;
