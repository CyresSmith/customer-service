import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import Loader from 'components/Ui/Loader';
import Search from 'components/Ui/Search/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetServicesCategoriesQuery } from 'services/categories.api';
import { IEmployee } from 'services/types/employee.types';
import ServicesList from '../ServicesList';
import { Container, ScrollWrapper, SearchBox, TopContainer } from './ChooseServices.styled';
import { useLazyGetServicesQuery } from 'services/service.api';
import { ServiceBasicInfo } from 'services/types/service.type';

type Props = {
    chosenEmployee: IEmployee | null;
    setServices: React.Dispatch<React.SetStateAction<ServiceBasicInfo[] | undefined>>;
    chosenServices: ServiceBasicInfo[] | undefined;
    companyId: number;
};

const ChooseServices = ({ companyId, chosenEmployee, setServices, chosenServices }: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [servicesList, setServicesList] = useState<ServiceBasicInfo[] | null>(null);
    const { isLoading: isCategoriesLoading, data: categories } = useGetServicesCategoriesQuery(
        { companyId: companyId },
        { skip: !companyId }
    );
    const [chosenCategory, setChosenCategory] = useState<SelectItem>({
        value: 'Обрати категорію',
        id: 'start',
    });

    const [
        getCompanyServices,
        { isSuccess: successGetCompanyServices, isLoading: isServicesLoading },
    ] = useLazyGetServicesQuery();

    useEffect(() => {
        const getServices = async () => {
            const { data: companyServices } = await getCompanyServices({ companyId });

            if (companyServices && successGetCompanyServices) {
                setServicesList(companyServices);
            }
        };

        if (chosenEmployee) {
            setServicesList(chosenEmployee.services);
        } else {
            getServices();
        }
    }, [chosenEmployee, companyId, getCompanyServices, successGetCompanyServices]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCategorySelect = (item: SelectItem) => {
        setChosenCategory(item);
    };

    const categoriesForSelect: SelectItem[] | undefined =
        categories &&
        categories.map(c => {
            return { value: c.name, id: c.id };
        });

    const filteredByEmployeeCategories = servicesList
        ? categoriesForSelect?.filter(c => servicesList.find(es => es.category.id === c.id))
        : categoriesForSelect;

    const selectAll = { value: 'Всі категорії', id: 'all' };

    return isCategoriesLoading || isServicesLoading ? (
        <Loader />
    ) : (
        <Container>
            <TopContainer>
                {filteredByEmployeeCategories && (
                    <CustomFormSelect
                        selectItems={[selectAll, ...filteredByEmployeeCategories]}
                        selectedItem={chosenCategory}
                        handleSelect={handleCategorySelect}
                        width="200px"
                    />
                )}
                <SearchBox>
                    <Search
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Пошук послуг"
                    />
                </SearchBox>
            </TopContainer>
            <ScrollWrapper>
                {servicesList && (
                    <ServicesList
                        servicesList={servicesList}
                        setServices={setServices}
                        // chosenEmployee={chosenEmployee}
                        searchQuery={searchQuery}
                        chosenCategory={chosenCategory}
                        chosenServices={chosenServices}
                    />
                )}
            </ScrollWrapper>
        </Container>
    );
};

export default ChooseServices;
