import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import Loader from 'components/Ui/Loader';
import Search from 'components/Ui/Search/Search';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, useState } from 'react';
import { useGetServicesCategoriesQuery } from 'services/categories.api';
import { BasicEmployeeInfo } from 'services/types/employee.types';
import { ServiceBasicInfo } from 'services/types/service.type';
import ServicesList from '../ServicesList';
import { Container, ScrollWrapper, SearchBox, TopContainer } from './ChooseServices.styled';

type Props = {
    chosenEmployee: BasicEmployeeInfo | null;
    setServices: React.Dispatch<React.SetStateAction<ServiceBasicInfo[] | undefined>>;
    chosenServices: ServiceBasicInfo[] | undefined;
};

const ChooseServices = ({ chosenEmployee, setServices, chosenServices }: Props) => {
    const { id: companyId } = useCompany();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { isLoading: isCategoriesLoading, data } = useGetServicesCategoriesQuery(
        { companyId },
        { skip: !companyId }
    );
    const [chosenCategory, setChosenCategory] = useState<SelectItem>({
        value: 'Обрати категорію',
        id: 'start',
    });

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCategorySelect = (item: SelectItem) => {
        setChosenCategory(item);
    };

    const categoriesForSelect: SelectItem[] | undefined =
        data &&
        data.map(c => {
            return { value: c.name, id: c.id };
        });

    const filteredByEmployeeCategories = chosenEmployee
        ? categoriesForSelect?.filter(c =>
              chosenEmployee.services.find(es => es.category!.id === c.id)
          )
        : categoriesForSelect;

    const selectAll = { value: 'Всі категорії', id: 'all' };

    return isCategoriesLoading ? (
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
                <ServicesList
                    setServices={setServices}
                    chosenEmployee={chosenEmployee}
                    searchQuery={searchQuery}
                    chosenCategory={chosenCategory}
                    chosenServices={chosenServices}
                />
            </ScrollWrapper>
        </Container>
    );
};

export default ChooseServices;
