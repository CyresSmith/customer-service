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
import { ServiceTypeEnum } from 'helpers/enums';
import generateBreakTimeArray from 'helpers/generateBreakTimeArray';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import {
  useAddNewServiceMutation,
  useGetServicesCategoriesQuery,
} from 'services/company.api';
import { ServiceCategory } from 'services/types/category.types';
import { ServiceDataType } from 'services/types/service.type';
import {
  AddServiceModalBox,
  ButtonBox,
  FormBox,
  FormSide,
} from '../AddServiceModal.styled';

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  serviceData: ServiceDataType | null;
  setServiceData: Dispatch<SetStateAction<ServiceDataType | null>>;
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
  duration: string;
  break: boolean;
  breakDuration: SelectItem;
  capacityLimit?: boolean;
  capacity?: number;
  placeLimit?: boolean;
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
  duration: '',
  break: false,
  breakDuration: breakTimeArray[0],
  capacityLimit: false,
  capacity: 0,
  placeLimit: false,
  places: 2,
};

const SecondStep = ({ setStep, serviceData }: Props) => {
  console.log('🚀 ~ SecondStep ~ serviceData:', serviceData);
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

  const [uploadService, {}] = useAddNewServiceMutation();

  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const handleServiceUpload = (state: typeof initialState) => {
    console.log('🚀 ~ handleServiceUpload ~ state:', state);

    // uploadService();
  };

  const filter = ['capacityLimit', 'capacity', 'placeLimit', 'places'];

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
    {
      name: 'duration',
      type: 'select',
      selectItems: breakTimeArray,
      selected: breakTimeArray[0],
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
    { name: 'placeLimit', type: 'checkbox', label: false },
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

  const isUploadDisabled =
    Object.values(state).includes('') ||
    state.employees.length === 0 ||
    state.category === null ||
    invalidFields.length > 0;

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

                if (!state.placeLimit && item.name === 'places') return;

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

              <ButtonBox>
                <Button
                  disabled={isUploadDisabled}
                  type="submit"
                  Icon={HiCloudUpload}
                  $colors="accent"
                >
                  Додати
                </Button>
              </ButtonBox>
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

export default SecondStep;
