import Button from 'components/Ui/Buttons/Button';
import { FormInput } from 'components/Ui/Form/CustomForm.styled';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { HiPlusCircle, HiX } from 'react-icons/hi';
import {
  ButtonBox,
  FilterBox,
  SearchBox,
  ServiceBarBox,
} from './Services.styled';

type Props = {
  handleModalOpen: () => void;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  selectItems: SelectItem[];
  selectedCategory: SelectItem[];
  handleSelect: (selected: SelectItem) => void;
};

const ServicesBar = ({
  handleModalOpen,
  filter = '',
  setFilter,
  selectItems,
  selectedCategory,
  handleSelect,
}: Props) => {
  const isAdmin = useAdminRights();
  const { services } = useCompany();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.trim());
  };

  return (
    <ServiceBarBox>
      <FilterBox>
        <SearchBox>
          <FormInput
            name="filter"
            type="text"
            value={filter}
            onChange={handleChange}
            placeholder="Пошук"
          />
          <ButtonBox $hideButton={filter === ''}>
            <Button
              $variant="text"
              $colors="danger"
              Icon={HiX}
              onClick={() => setFilter('')}
            />
          </ButtonBox>
        </SearchBox>

        <CustomFormSelect
          width="200px"
          selectItems={selectItems}
          selectedItem={selectedCategory}
          handleSelect={handleSelect}
        />
      </FilterBox>

      {isAdmin && (
        <Button
          onClick={handleModalOpen}
          Icon={HiPlusCircle}
          $colors="accent"
          shake={services.length === 0}
        >
          Додати послугу
        </Button>
      )}
    </ServiceBarBox>
  );
};

export default ServicesBar;
