import AddCategoryModal from 'components/AddCategoryModal';
import Button from 'components/Ui/Buttons/Button';
import {
  FormInputLabel,
  FormInputsListItem,
} from 'components/Ui/Form/CustomForm.styled';
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
  Form,
  FormSide,
  ModalBox,
} from '../ServiceModal.styled';

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
    category: serviceData?.category || null,
    name: serviceData?.name || '',
    desc: serviceData?.desc || '',
  };

  const inputs: Partial<InputProps>[] = [
    {
      name: 'category',
      type: 'select',
      selectItems: [
        ...categories
          .filter(({ type }) => type === serviceData.type)
          .map(({ id, name }) => ({ id, value: name })),
        addCategoryItem,
      ],
    },
    { name: 'name', type: 'text' },
    { name: 'desc', type: 'textarea' },
  ];

  const onSubmit = (state: InitialStateType) => {
    if (state?.category && state.category !== null) {
      setServiceData(p => ({
        ...p,
        ...state,
        category: state.category as SelectItem,
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
    setServiceData(p => ({ ...p, type: item.id, category: null }));
  };

  const isSubmitDisabled =
    state.name === '' || state.category === null || invalidFields.length > 0;

  useEffect(() => {
    setState(p => ({
      ...p,
      category: serviceData?.category || initialState.category,
      name: serviceData?.name,
      desc: serviceData?.desc,
    }));
  }, [serviceData]);

  useEffect(() => {
    if (!data) return;

    setCategories(data);
  }, [data]);

  return (
    <>
      <ModalBox>
        {isCategoriesLoading ? (
          <Loader />
        ) : (
          <AddServiceModalBox>
            <FormSide>
              <FormInputsListItem as="div">
                <FormInputLabel>Тип</FormInputLabel>
                <RadioSelect
                  items={selectItems}
                  selectedItemId={serviceData.type}
                  onSelect={handleTypeSelectClick}
                />
              </FormInputsListItem>

              <Form onSubmit={handleSubmit}>
                <FormSide>
                  {(inputs as InputProps[]).map((item, i) => (
                    <CustomFormInput
                      key={i}
                      {...item}
                      value={state[item.name as keyof InputValueType]}
                      handleChange={handleChange}
                      handleSelect={handleCategorySelect}
                      isValid={getErrorMessage(item.name, invalidFields)}
                      disabledIcon={item.name === 'category' ? true : false}
                    />
                  ))}
                </FormSide>

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
              </Form>
            </FormSide>
          </AddServiceModalBox>
        )}
      </ModalBox>

      {addCategoryModalOpen && (
        <AddCategoryModal
          modalId="addCategory"
          isOpen={addCategoryModalOpen}
          closeModal={() => setAddCategoryModalOpen(false)}
          type={serviceData.type as ServiceTypeEnum}
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
