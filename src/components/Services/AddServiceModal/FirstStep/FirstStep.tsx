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
import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { useGetServicesCategoriesQuery } from 'services/company.api';
import { ServiceCategory } from 'services/types/category.types';
import { AddServiceStepProps } from 'services/types/service.type';
import {
  AddServiceModalBox,
  ButtonBox,
  FormBox,
  FormSide,
} from '../AddServiceModal.styled';

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

const FirstStep = ({
  setStep,
  serviceData,
  setServiceData,
}: AddServiceStepProps) => {
  const { id } = useCompany();

  const {
    isLoading: isCategoriesLoading,
    data,
    refetch,
  } = useGetServicesCategoriesQuery({ id });

  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const initialState: InitialStateType = {
    category: null,
    name: serviceData?.name || '',
    desc: serviceData?.desc || '',
  };

  const [serviceType, setServiceType] = useState<ServiceTypeEnum>(
    (serviceData?.type as ServiceTypeEnum) || ServiceTypeEnum.INDIVIDUAL
  );

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
    if (state?.category?.id) {
      setServiceData(p => ({
        ...p,
        ...state,
        category: String(state.category?.id),
      }));
    }

    setStep(2);
  };

  const {
    handleChange,
    handleSubmit,
    handleSelect,
    invalidFields,
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
    setServiceData(p => ({ ...p, type: item.id }));
    setServiceType(item.id as ServiceTypeEnum);
  };

  const handleAvatarUpload = () => {};

  const isSubmitDisabled =
    state.name === '' || state.category === null || invalidFields.length > 0;

  useEffect(() => {
    setState(p => ({ ...p, category: initialState.category }));
  }, [initialState.category, serviceType, setState]);

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
