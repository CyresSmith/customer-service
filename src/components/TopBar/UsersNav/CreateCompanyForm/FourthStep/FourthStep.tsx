import Button from 'components/Ui/Buttons/Button';
import areAllFieldsFilled from 'helpers/areAllFieldsFilled';
import handleError from 'helpers/errorHandler';
import { useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useCreateCompanyMutation } from 'services/company.api';
import BackButton from '../Buttons/BackButton';
import { ButtonBox, Title } from '../CreateCompanyForm.styled';
import { stepProps } from '../CreateCompanyForm.types';

interface Props extends stepProps {
  closeModal: () => void;
}

const FourthStep = ({ companyData, prevPage, closeModal }: Props) => {
  const [createCompany, { isLoading, isSuccess, isError, error }] =
    useCreateCompanyMutation();

  const handleCompanyCreate = async () => {
    const data = await createCompany(companyData).unwrap();

    if (data && data.name) {
      toast.success(`Вітаю, Компанію "${data.name}" створено!`);
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('isLoading');
    }

    if (isSuccess) {
      closeModal();
    }

    if (isError) {
      console.log(error);
      toast.error(handleError(error));
    }
  }, [closeModal, error, isError, isLoading, isSuccess]);

  return (
    <div>
      <Title>Основна інформація</Title>

      <p>Основна інформація</p>

      <ButtonBox>
        <BackButton
          disabled={isLoading}
          isLoading={isLoading}
          onClick={prevPage}
        />

        <Button
          id="next"
          $iconPosition="l"
          Icon={IoMdAddCircle}
          $colors="accent"
          disabled={isLoading || !areAllFieldsFilled(companyData)}
          isLoading={isLoading}
          onClick={handleCompanyCreate}
        >
          Створити компанію
        </Button>
      </ButtonBox>
    </div>
  );
};

export default FourthStep;
