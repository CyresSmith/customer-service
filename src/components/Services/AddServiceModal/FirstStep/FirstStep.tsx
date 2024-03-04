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
import { getErrorMessage } from 'helpers/inputsValidation';
import { useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { useGetServicesCategoriesQuery } from 'services/company.api';
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
  setServiceData: Dispatch<SetStateAction<Partial<ServiceDataType>>>;
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
};

const initialState: InitialStateType = {
  category: null,
  name: '',
  desc: '',
};

const FirstStep = ({ setStep, setServiceData }: Props) => {
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
  ];

  const onSubmit = (state: InitialStateType) => {
    console.log('🚀 ~ onSubmit ~ state:', state);

    // if (state?.category?.id) {
    //   setServiceData({
    //     ...state,
    //     category: String(state.category?.id),
    //   });
    // }
  };

  const {
    handleChange,
    handleSubmit,
    handleSelect,
    invalidFields,
    reset,
    setState,
    state,
  } = useForm(initialState, onSubmit);

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

  const isSubmitDisabled =
    state.name === '' || state.category === null || invalidFields.length > 0;

  const handleNextClick = () => {
    if (isSubmitDisabled) return;

    setStep(2);
  };

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
              {(inputs as InputProps[]).map((item, i) => (
                <CustomFormInput
                  key={i}
                  {...item}
                  value={state[item.name as keyof InputValueType]}
                  handleChange={handleChange}
                  handleSelect={handleCategorySelect}
                  isValid={getErrorMessage(item.name, invalidFields)}
                />
              ))}

              <ButtonBox>
                <Button
                  disabled={isSubmitDisabled}
                  type="submit"
                  Icon={HiArrowRight}
                  $colors="accent"
                  $iconPosition="r"
                  onClick={handleNextClick}
                >
                  Далі
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

export default FirstStep;
