import AddCategoryModal from 'components/AddCategoryModal';
import Avatar from 'components/Avatar';
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
import RadioSelect, {
  RadioSelectItemType,
} from 'components/Ui/RadioSelect/RadioSelect';
import { ServiceOpenModal, ServiceTypeEnum } from 'helpers/enums';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useAdminRights, useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { ChangeEvent, useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { useUploadServiceAvatarMutation } from 'services/service.api';
import { ServiceCategory } from 'services/types/category.types';
import { ServiceStepProps } from 'services/types/service.type';
import {
  ButtonBox,
  FirstStepBox,
  FormSide,
  StepFormBox,
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

interface Props extends ServiceStepProps {
  serviceId?: number;
  categories: ServiceCategory[];
}

const FirstStep = ({
  openModal,
  setStep,
  serviceData,
  setServiceData,
  stateToCheck,
  serviceId,
  handleServiceUpdate,
  isServiceUpdateLoading,
  categories,
}: Props) => {
  const { id } = useCompany();
  const isAdmin = useAdminRights();

  const [uploadImg, { isLoading: isAvatarLoading }] =
    useUploadServiceAvatarMutation();

  const handleAvatarUpload = async (file: File) => {
    const data = new FormData();
    data.append('avatar', file);

    if (serviceId) {
      const { url } = await uploadImg({
        companyId: +id,
        serviceId,
        data,
      }).unwrap();

      if (url) {
        setServiceData(p => ({ ...p, avatar: url }));
      }
    }
  };

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

  const updateObj = {
    type: serviceData?.type,
    ...state,
  };

  const serviceUpdate = async () => {
    if (updateObj.category && updateObj.category.id !== undefined) {
      const { desc, category, ...rest } = updateObj;

      if (category.id) {
        const data = !desc
          ? { ...rest, category: +category.id }
          : { ...rest, category: +category.id, desc };

        handleServiceUpdate(data);
      }
    }
  };

  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  const handleCategorySelect = (selected: SelectItem, fieldName?: string) => {
    if (selected.id === addCategoryItem.id) {
      setAddCategoryModalOpen(true);
    } else if (fieldName) {
      setServiceData(p => ({ ...p, category: selected }));
      handleSelect(selected, fieldName);
    }
  };

  const handleTypeSelectClick = (item: RadioSelectItemType) => {
    if (!isAdmin) return;

    setServiceData(p => ({ ...p, type: item.id, category: null }));
  };

  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setServiceData(p => ({ ...p, [name]: value }));
    handleChange(e);
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

  const checkString = JSON.stringify({
    type: stateToCheck?.type,
    category: stateToCheck?.category,
    name: stateToCheck?.name,
    desc: stateToCheck?.desc,
  });

  const stateString = JSON.stringify(updateObj);

  const saveDisabled =
    invalidFields.length > 0 ||
    checkString === stateString ||
    !state.name ||
    !state.category;

  return (
    <>
      <FirstStepBox>
        {openModal === ServiceOpenModal.EDIT_SERVICE && (
          <Avatar
            currentImageUrl={serviceData.avatar || ''}
            isLoading={isAvatarLoading}
            allowChanges={isAdmin}
            size={150}
            alt="service image"
            handleUpload={handleAvatarUpload}
          />
        )}

        <StepFormBox onSubmit={handleSubmit}>
          <FormSide>
            <FormInputsListItem>
              <FormInputLabel>Тип</FormInputLabel>
              <RadioSelect
                items={selectItems}
                selectedItemId={serviceData.type}
                onSelect={handleTypeSelectClick}
              />
            </FormInputsListItem>

            {(inputs as InputProps[]).map((item, i) => (
              <CustomFormInput
                key={i}
                {...item}
                value={state[item.name as keyof InputValueType]}
                handleChange={handleStateChange}
                handleSelect={handleCategorySelect}
                isValid={getErrorMessage(item.name, invalidFields)}
                disabledIcon={item.name === 'category' ? true : false}
                isReadonly={!isAdmin}
              />
            ))}
          </FormSide>

          {openModal === ServiceOpenModal.EDIT_SERVICE && isAdmin && (
            <ButtonBox>
              <Button
                onClick={serviceUpdate}
                disabled={saveDisabled || isServiceUpdateLoading}
                Icon={IoIosSave}
                $colors="accent"
                isLoading={isServiceUpdateLoading}
              >
                Зберегти
              </Button>
            </ButtonBox>
          )}

          {openModal === ServiceOpenModal.ADD && (
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
          )}
        </StepFormBox>
      </FirstStepBox>

      {addCategoryModalOpen && (
        <AddCategoryModal
          modalId="addCategory"
          isOpen={addCategoryModalOpen}
          closeModal={() => setAddCategoryModalOpen(false)}
          type={serviceData.type as ServiceTypeEnum}
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
