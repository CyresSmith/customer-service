import CustomForm from 'components/Ui/Form/CustomForm';
import { InputProps } from 'components/Ui/Form/types';
import Modal from 'components/Ui/Modal/Modal';
import { ServiceTypeEnum } from 'helpers/enums';
import { useCompany } from 'hooks/useCompany';
import { HiCloudUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useAddServiceCategoryMutation } from 'services/categories.api';
import { Category } from 'services/types/category.types';

type Props = {
  modalId?: string;
  type: ServiceTypeEnum;
  isOpen: boolean;
  closeModal: () => void;
  refetch?: () => void;
  onCategoryAdd?: (newCategory: Category) => void;
};

const categoryInitialState = {
  name: '',
};

const categoryInputs: InputProps[] = [{ name: 'name', type: 'text' }];

const AddCategoryModal = ({
  modalId,
  type,
  isOpen,
  closeModal,
  refetch,
  onCategoryAdd,
}: Props) => {
  const { id } = useCompany();

  const [addServiceCategory, { isLoading: isServiceCategoryLoading }] =
    useAddServiceCategoryMutation();

  const handleCategoryAdd = async (data: typeof categoryInitialState) => {
    const response = await addServiceCategory({
      id,
      data: { ...data, type },
    }).unwrap();

    if (response) {
      toast.success('Категорію додано');
      refetch && refetch();
      onCategoryAdd && onCategoryAdd(response);
      closeModal();
    }
  };

  return (
    <Modal
      title="Додати нову категорію"
      $isOpen={isOpen}
      closeModal={closeModal}
      id={modalId}
    >
      <CustomForm
        inputs={categoryInputs}
        buttonLabel="Додати"
        onSubmit={handleCategoryAdd}
        initialState={categoryInitialState}
        isLoading={isServiceCategoryLoading}
        SubmitButtonIcon={HiCloudUpload}
      />
    </Modal>
  );
};

export default AddCategoryModal;
