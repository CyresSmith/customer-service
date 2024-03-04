import AddCategoryModal from 'components/AddCategoryModal';
import Avatar from 'components/Avatar';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { InputValueType, SelectItem } from 'components/Ui/Form/types';
import Loader from 'components/Ui/Loader';
import RadioSelect, {
  RadioSelectItemType,
} from 'components/Ui/RadioSelect/RadioSelect';
import { AddServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGetServicesCategoriesQuery } from 'services/company.api';
import { ServiceCategory } from 'services/types/category.types';
import {
  AddServiceModalBox,
  FormBox,
  FormSide,
} from './AddServiceModal.styled';

type Props = {
  setOpenModal: Dispatch<SetStateAction<AddServiceOpenModal | null>>;
};

const initialState: {
  category: null | SelectItem;
  name: string;
  desc: string;
  break: boolean;
} = {
  category: null,
  name: '',
  desc: '',
  break: false,
};

const addCategoryItem = { id: 'add', value: 'Додати категорію...' };

const selectItems = [
  {
    id: ServiceTypeEnum.INDIVIDUAL,
    label: 'Індівідуальна',
  },
  {
    id: ServiceTypeEnum.GROUP,
    label: 'Групова',
  },
];

const AddServiceModal = ({ setOpenModal }: Props) => {
  const { id } = useCompany();

  const [serviceType, setServiceType] = useState<ServiceTypeEnum>(
    ServiceTypeEnum.INDIVIDUAL
  );

  const {
    isLoading: isCategoriesLoading,
    data,
    refetch,
    isSuccess,
  } = useGetServicesCategoriesQuery({ id });

  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const inputs = [
    {
      name: 'category',
      type: 'select',
      selectItems: [
        ...categories
          .filter(({ type }) => type === serviceType)
          .map(({ id, name }) => ({ id, value: name })),
        addCategoryItem,
      ],
    },
    { name: 'name', type: 'text' },
    { name: 'desc', type: 'textarea' },
    { name: 'break', type: 'checkbox' },
  ];

  const handleServiceUpload = (state: typeof initialState) => {
    console.log('state: ', state);
  };

  const {
    handleChange,
    handleSubmit,
    handleSelect,
    invalidFields,
    reset,
    setState,
    state,
  } = useForm(initialState, handleServiceUpload);

  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  const handleCategorySelect = (selected: SelectItem, fieldName?: string) => {
    if (selected.id === addCategoryItem.id) {
      setAddCategoryModalOpen(true);
    } else if (fieldName) {
      handleSelect(selected, fieldName);
    }
  };

  const handleTypeSelectClick = (item: RadioSelectItemType) => {
    setServiceType(item.id as ServiceTypeEnum);
  };

  const handleAvatarUpload = () => {};

  useEffect(() => {
    console.log('🚀 ~ AddServiceModal ~ state:', state);
  }, [state]);

  useEffect(() => {
    setState(p => ({ ...p, category: initialState.category }));
  }, [serviceType]);

  useEffect(() => {
    if (!data) return;

    setCategories(data);
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

          <FormSide>
            <RadioSelect
              items={selectItems}
              selectedItemId={serviceType}
              onSelect={handleTypeSelectClick}
            />

            <FormBox>
              {inputs.map((item, i) => (
                <CustomFormInput
                  key={i}
                  {...item}
                  value={state[item.name as keyof InputValueType]}
                  handleChange={handleChange}
                  handleSelect={handleCategorySelect}
                />
              ))}
            </FormBox>
          </FormSide>
        </AddServiceModalBox>
      )}

      {addCategoryModalOpen && (
        <AddCategoryModal
          modalId="addCategory"
          isOpen={addCategoryModalOpen}
          closeModal={() => setAddCategoryModalOpen(false)}
          type={serviceType}
          refetch={refetch}
          onCategoryAdd={({ id, name }) =>
            setState(p => ({
              ...p,
              category: { id, value: name },
            }))
          }
        />
      )}
    </>
  );
};

export default AddServiceModal;
