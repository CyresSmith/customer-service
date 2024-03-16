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
import { IService } from "services/types/service.type";

type Props = {
    chosenEmployee: IEmployee | null;
    setServices: React.Dispatch<React.SetStateAction<Partial<IService>[] | undefined>>;
    chosenServices: Partial<IService>[] | undefined;
};

const ChooseServices = ({chosenEmployee, setServices, chosenServices}: Props) => {
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
                    setServices={setServices}
                    chosenEmployee={chosenEmployee}
                    searchQuery={searchQuery}
                    chosenCategory={chosenCategory}
                    chosenServices={chosenServices}
                />
            </ScrollWrapper>
        </Container>)
};

export default ChooseServices;