import Search from "components/Ui/Search/Search";
import CustomFormSelect from "components/Ui/Form/CustomFormSelect";
import ServicesList from "../ServicesList";
import { Container, ScrollWrapper, SearchBox, TopContainer } from "./ChooseServices.styled";
import { ChangeEvent, useState } from "react";
import { useGetServicesCategoriesQuery } from "services/company.api";
import { useCompany } from "hooks/useCompany";
import Loader from "components/Ui/Loader";
import { SelectItem } from "components/Ui/Form/types";

const ChooseServices = () => {
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

    const selectAll = { value: 'Всі категорії', id: 'all' };

    return isCategoriesLoading ?
        <Loader /> :
        (<Container>
            <TopContainer>
                    {categoriesForSelect &&
                        <CustomFormSelect
                            selectItems={[selectAll, ...categoriesForSelect]}
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
                <ServicesList searchQuery={searchQuery} chosenCategory={chosenCategory} />
            </ScrollWrapper>
        </Container>)
};

export default ChooseServices;