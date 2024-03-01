import Avatar from 'components/Avatar';
import CustomForm from 'components/Ui/Form/CustomForm';
import { InputProps } from 'components/Ui/Form/types';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import RadioSelect, {
  RadioSelectItemType,
} from 'components/Ui/RadioSelect/RadioSelect';
import Select from 'components/Ui/Select';
import { AddServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  useAddServiceCategoryMutation,
  useGetServicesCategoriesQuery,
} from 'services/company.api';
import { AddServiceModalBox } from './AddServiceModal.styled';

type Props = {
  setOpenModal: Dispatch<SetStateAction<AddServiceOpenModal | null>>;
};

const selectItems = [
  { id: ServiceTypeEnum.INDIVIDUAL, label: 'Індівідуальна' },
  { id: ServiceTypeEnum.GROUP, label: 'Групова' },
];

const initialState = {
  name: '',
  desc: '',
  category: '',
  break: false,
};

const inputs: InputProps[] = [
  { name: 'name', type: 'text' },
  { name: 'desc', type: 'text' },
  { name: 'category', type: 'select' },
  { name: 'break', type: 'checkbox' },
];

const categoryInitialState = {
  name: '',
};

const categoryInputs: InputProps[] = [{ name: 'name', type: 'text' }];

const AddServiceModal = ({ setOpenModal }: Props) => {
  const { id } = useCompany();

  const {
    isLoading: isCategoriesLoading,
    data,
    refetch,
  } = useGetServicesCategoriesQuery({ id });

  const [addServiceCategory, { isSuccess }] = useAddServiceCategoryMutation();

  const [serviceType, setServiceType] = useState<string>(
    ServiceTypeEnum.INDIVIDUAL
  );

  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  const [categories, setCategories] = useState([
    { id: 'add', name: 'Додати нову катигорію...' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (name: string) => {
    if (name === categories[categories.length - 1].name) {
      return setAddCategoryModalOpen(true);
    }

    setSelectedCategory(name);
  };

  const handleTypeSelectClick = (item: RadioSelectItemType) => {
    setServiceType(String(item.id));
  };

  const handleAvatarUpload = () => {};

  const handleServiceUpload = (state: typeof initialState) => {
    console.log('state: ', state);
  };

  const handleServiceCategoryAdd = async (
    data: typeof categoryInitialState
  ) => {
    const response = await addServiceCategory({ id, data }).unwrap();

    if (response) {
      refetch();
    }
  };

  useEffect(() => {
    if (data?.length === 0) return;

    if (data && data?.length > 0) {
      setCategories(p => [...data, ...p]);
    }
  }, [data]);

  return (
    <>
      {isCategoriesLoading ? (
        <Loader />
      ) : (
        <AddServiceModalBox>
          <Avatar
            currentImageUrl={''}
            isLoading={false}
            size={150}
            alt="employee image"
            handleUpload={handleAvatarUpload}
          />

          <div>
            <RadioSelect
              items={selectItems}
              selectedItemId={serviceType}
              onSelect={handleTypeSelectClick}
            />

            <Select
              $colors="light"
              onSelect={handleCategorySelect}
              selectedItem={selectedCategory}
              items={categories.map(({ name }) => name)}
            />

            <CustomForm
              inputs={categoryInputs}
              buttonLabel="Додати категорию"
              onSubmit={handleServiceCategoryAdd}
              initialState={categoryInitialState}
            />

            <CustomForm
              inputs={inputs}
              buttonLabel="Додати"
              onSubmit={handleServiceUpload}
              initialState={initialState}
            />
          </div>
        </AddServiceModalBox>
      )}

      {addCategoryModalOpen && (
        <Modal
          title="Додати нову категорію"
          $isOpen={addCategoryModalOpen}
          closeModal={() => setAddCategoryModalOpen(false)}
          id="addCategory"
        >
          <p>Додати категорыю</p>
        </Modal>
      )}
    </>
  );
};

export default AddServiceModal;
