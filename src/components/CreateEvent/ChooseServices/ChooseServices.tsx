import Search from "components/Ui/Search/Search";
import CustomFormSelect from "components/Ui/Form/CustomFormSelect";
import ServicesList from "../ServicesList";
import { Container, ScrollWrapper, SearchBox, TopContainer } from "./ChooseServices.styled";
import { ChangeEvent, useState } from "react";
import { useGetServicesCategoriesQuery } from "services/company.api";
import { useCompany } from "hooks/useCompany";
import Loader from "components/Ui/Loader";
import { SelectItem } from "components/Ui/Form/types";
import { IEmployee } from "services/types/employee.types";

type Props = {
    chosenEmployee: IEmployee | null;
};

const ChooseServices = ({chosenEmployee}: Props) => {
    const { id } = useCompany();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const {isLoading: isCategoriesLoading, data} = useGetServicesCategoriesQuery({ id }, { skip: id === undefined });
    const [chosenCategory, setChosenCategory] = useState<SelectItem>({value: 'Обрати категорію', id: 'start'});

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    };

    const handleCategorySelect = (item: SelectItem) => {
        setChosenCategory(item);
    }

    const categoriesForSelect: SelectItem[] | undefined = data && data.map(c => {
        return { value: c.name, id: c.id };
    });

    const filteredByEmployeeCategories = chosenEmployee ?
        categoriesForSelect?.filter(c => chosenEmployee.services.find(es => es.category!.id === c.id)) :
        categoriesForSelect;

    const selectAll = { value: 'Всі категорії', id: 'all' };

    return isCategoriesLoading ?
        <Loader /> :
        (<Container>
            <TopContainer>
                    {filteredByEmployeeCategories &&
                        <CustomFormSelect
                            selectItems={[selectAll, ...filteredByEmployeeCategories]}
                            selectedItem={chosenCategory}
                            handleSelect={handleCategorySelect}
                            width="200px"
                        />
                    }
                <SearchBox>
                    <Search value={searchQuery} onChange={handleSearchChange} placeholder="Пошук послуг" />
                </SearchBox>
            </TopContainer>
            <ScrollWrapper>
                <ServicesList
                    chosenEmployee={chosenEmployee}
                    searchQuery={searchQuery}
                    chosenCategory={chosenCategory}
                />
            </ScrollWrapper>
        </Container>)
};

export default ChooseServices;