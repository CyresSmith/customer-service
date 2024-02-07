import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { State, useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUpdateCompanyProfileMutation } from 'services/company.api';
import { ModalBox } from '../CompanyProfile.styled';
import { Form } from './EditDescModal.styled';

const inputs = [{ name: 'desc', type: 'textarea' }];

type Props = { closeModal: () => void };

const EditDescModal = ({ closeModal }: Props) => {
  const { id, desc } = useCompany();
  const { updateCompanyData } = useActions();

  const [uploadDesc, { isLoading, isSuccess }] =
    useUpdateCompanyProfileMutation();

  const onSubmit = async ({ desc: newDesc }: State) => {
    if (newDesc) {
      const data: { desc: string } = { desc: newDesc };

      const { message } = await uploadDesc({
        id,
        data,
      }).unwrap();

      if (message) updateCompanyData(data);

      closeModal();
    }
  };

  const { handleChange, handleSubmit, state, invalidFields, reset } = useForm({
    initialState: { desc: desc ? desc : '' },
    onSubmit,
  });

  const errorMessage = (name: string): string | undefined => {
    const error = invalidFields.find(f => Object.keys(f)[0] === name);
    if (error) {
      return Object.values(error)[0];
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success('Опис оновлено');
  }, [isSuccess]);

  return (
    <ModalBox>
      <Form onSubmit={handleSubmit}>
        <CustomFormInput
          as="textarea"
          name="desc"
          type="text"
          value={state.desc}
          handleChange={handleChange}
          disabledIcon
          isValid={errorMessage('desc')}
        />

        <div>
          <Button
            disabled={isLoading || Boolean(errorMessage('desc'))}
            Icon={HiCloudUpload}
            type="submit"
            $colors="accent"
          >
            Змінити
          </Button>
        </div>
      </Form>
    </ModalBox>
  );
};

export default EditDescModal;
