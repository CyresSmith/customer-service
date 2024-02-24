import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useEffect } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUpdateCompanyProfileMutation } from 'services/company.api';
import { ModalBox } from '../CompanyProfile.styled';

const inputs = [{ name: 'phone', type: 'tel' }];

type Props = { closeModal: () => void; phone: string | null };

const EditPhonesModal = ({ closeModal, phone }: Props) => {
  const { id, phones } = useCompany();
  const { updateCompanyData } = useActions();
  const [uploadPhone, { isLoading, isSuccess }] =
    useUpdateCompanyProfileMutation();

  const handleSubmit = async (state: { phone: string }) => {
    if (state.phone) {
      const data = {
        phones: phone
          ? phones.map(item => (item === phone ? state.phone : item))
          : [...phones, state.phone],
      };

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
    <ModalBox>
      <CustomForm
        SubmitButtonIcon={HiCloudUpload}
        buttonLabel={phone ? 'Змінити' : 'Додати'}
        inputs={inputs}
        onSubmit={handleSubmit}
        initialState={phone ? { phone } : { phone: '' }}
        isLoading={isLoading}
      />
    </ModalBox>
  );
};

export default EditPhonesModal;
