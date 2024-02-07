import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { State } from 'hooks/useForm';
import { useEffect } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUpdateCompanyProfileMutation } from 'services/company.api';
import { Box } from './EditPhonesModal.styled';

const inputs = [{ name: 'phone', type: 'tel' }];

type Props = { closeModal: () => void; phone: string | null };

const EditPhonesModal = ({ closeModal, phone }: Props) => {
  const { id, phones } = useCompany();
  const { updateCompanyData } = useActions();
  const [uploadPhone, { isLoading, isSuccess }] =
    useUpdateCompanyProfileMutation();

  const handleSubmit = async ({ phone: newPhone }: State) => {
    if (newPhone) {
      const data: { phones: string[] } = { phones: [] };

      if (phone) {
        data.phones = phones.map(item => (item === phone ? newPhone : item));
      } else {
        data.phones = [...phones, newPhone];
      }

      const { message } = await uploadPhone({
        id,
        data,
      }).unwrap();

      if (message) updateCompanyData(data);

      closeModal();
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success('Телефони оновлено');
  }, [isSuccess]);

  return (
    <Box>
      <CustomForm
        SubmitButtonIcon={HiCloudUpload}
        buttonLabel={phone ? 'Змінити' : 'Додати'}
        inputs={inputs}
        onSubmit={handleSubmit}
        initialState={phone ? { phone } : { phone: '' }}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default EditPhonesModal;
