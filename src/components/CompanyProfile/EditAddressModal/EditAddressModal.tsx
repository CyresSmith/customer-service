import CustomForm from 'components/Ui/Form/CustomForm';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { State } from 'hooks/useForm';
import { useEffect } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUpdateCompanyProfileMutation } from 'services/company.api';
import { ModalBox } from '../CompanyProfile.styled';

const inputs = [
  { name: 'city', type: 'text' },
  { name: 'address', type: 'text' },
  { name: 'index', type: 'text' },
];

type Props = { closeModal: () => void };

const EditAddressModal = ({ closeModal }: Props) => {
  const { id, address } = useCompany();
  const { updateCompanyData } = useActions();
  const [updateAddress, { isLoading, isSuccess }] =
    useUpdateCompanyProfileMutation();

  const handleSubmit = async (state: State) => {
    const data = {
      address: Object.values(state).join(', '),
    };

    const { message } = await updateAddress({ id, data }).unwrap();

    if (message) {
      updateCompanyData(data);
      closeModal();
    }
  };

  const getInitialState = () => {
    const addressArr = address.split(', ');

    return {
      city: addressArr[0],
      address: addressArr.slice(1, addressArr.length - 1).join(', '),
      index: addressArr.reverse()[0],
    };
  };

  useEffect(() => {
    if (isSuccess) toast.success('Адресу оновлено');
  }, [isSuccess]);

  return (
    <ModalBox>
      <CustomForm
        SubmitButtonIcon={HiCloudUpload}
        buttonLabel="Змінити"
        inputs={inputs}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
        isLoading={isLoading}
      />
    </ModalBox>
  );
};

export default EditAddressModal;
