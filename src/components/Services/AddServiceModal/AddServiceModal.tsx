import AddCategoryModal from 'components/AddCategoryModal';
import Avatar from 'components/Avatar';
import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import {
  InputProps,
  InputValueType,
  SelectItem,
} from 'components/Ui/Form/types';
import Loader from 'components/Ui/Loader';
import RadioSelect, {
  RadioSelectItemType,
} from 'components/Ui/RadioSelect/RadioSelect';
import { AddServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import generateBreakTimeArray from 'helpers/generateBreakTimearray';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
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

type InitialStateType = {
  category: null | SelectItem;
  name: string;
  desc: string;
  employees: [] | SelectItem[];
  break: boolean;
  breakDuration: SelectItem;
  capacityLimit?: boolean;
  capacity?: number;
  placesLimit?: boolean;
  places?: number;
};

const breakTimeArray = generateBreakTimeArray().map((value, i) => ({
  id: i,
  value,
}));

const initialState: InitialStateType = {
  category: null,
  name: '',
  desc: '',
  employees: [],
  break: false,
  breakDuration: breakTimeArray[0],
  capacityLimit: false,
  capacity: 0,
  placesLimit: false,
  places: 2,
};

const AddServiceModal = ({ setOpenModal }: Props) => {
  const { id, employees } = useCompany();

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

  const handleServiceUpload = (state: typeof initialState) => {
    console.log('state upload: ', state);
  };

  const filter = ['capacityLimit', 'capacity', 'placesLimit', 'places'];

  const inputs: Partial<InputProps>[] = [
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
    {
      name: 'employees',
      type: 'select',
      selectItems: employees
        .filter(({ provider }) => provider)
        .map(({ id, firstName, lastName }) => ({
          id,
          value: lastName ? firstName + ' ' + lastName : firstName,
        })),
    },
    { name: 'break', type: 'checkbox', label: false },
    {
      name: 'breakDuration',
      type: 'select',
      selectItems: breakTimeArray,
      selected: breakTimeArray[0],
    },
    { name: 'capacityLimit', type: 'checkbox', label: false },
    { name: 'capacity', type: 'number' },
    { name: 'placesLimit', type: 'checkbox', label: false },
    { name: 'places', type: 'number' },
  ];

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

            <FormBox onSubmit={handleSubmit}>
              {(inputs as InputProps[]).map((item, i) => {
                if (
                  item.name &&
                  serviceType === ServiceTypeEnum.INDIVIDUAL &&
                  filter.includes(item.name)
                ) {
                  return;
                }

                if (!state.break && item.name === 'breakDuration') return;

                if (!state.capacityLimit && item.name === 'capacity') return;

                if (!state.placesLimit && item.name === 'places') return;

                return (
                  <CustomFormInput
                    key={i}
                    {...item}
                    value={state[item.name as keyof InputValueType]}
                    handleChange={handleChange}
                    handleSelect={handleCategorySelect}
                    isValid={getErrorMessage(item.name, invalidFields)}
                  />
                );
              })}

              <Button type="submit" Icon={HiCloudUpload}>
                Додати
              </Button>
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
