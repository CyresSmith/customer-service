import Button from 'components/Ui/Buttons/Button';
import { Form, FormInputsList } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import areAllFieldsFilled from 'helpers/areAllFieldsFilled';
import handleError from 'helpers/errorHandler';
import { useActions } from 'hooks';
import { useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateCompanyMutation } from 'services/company.api';
import BackButton from '../Buttons/BackButton';
import { ButtonBox, Title } from '../CreateCompanyForm.styled';
import { stepProps } from '../CreateCompanyForm.types';

interface Props extends stepProps {
  closeModal: () => void;
}

const inputs = [
  { name: 'name', type: 'text' },
  { name: 'city', type: 'text' },
  { name: 'address', type: 'address' },
  { name: 'index', type: 'text' },
  { name: 'phone', type: 'phone' },
];

type InitialState = {
  name: string;
  city: string;
  address: string;
  index: string;
  phone: string;
};

const initialState = {
  name: '',
  city: '',
  address: '',
  index: '',
  phone: '',
};

const FourthStep = ({
  companyData,
  setCompanyData,
  prevPage,
  closeModal,
}: Props) => {
  const [createCompany, { isLoading, isSuccess, isError, error }] =
    useCreateCompanyMutation();

  const { addNewCompany } = useActions();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = await createCompany({
      ...companyData,
      phones: [companyData.phone],
      address: `${companyData.city}, ${companyData.address}, ${companyData.index}`,
    }).unwrap();

    if (data && data.name) {
      addNewCompany(data);
      navigate(`${data.id}/profile`);
      toast.success(`Вітаю, Компанію "${data.name}" створено!`);
    }
  };

  const { handleChange, handleSubmit, state, invalidFields, reset } =
    useForm<InitialState>(initialState, onSubmit);

  const errorMessage = (name: string): string | undefined => {
    const error = invalidFields.find(f => Object.keys(f)[0] === name);
    if (error) {
      return Object.values(error)[0];
    }
  };

  useEffect(() => {
    setCompanyData(p => ({ ...p, ...state }));
  }, [setCompanyData, state]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }

    if (isError) {
      console.log(error);
      toast.error(handleError(error));
    }
  }, [closeModal, error, isError, isSuccess, reset]);

  return (
    <>
      <Title>Основна інформація</Title>

      <Form onSubmit={handleSubmit}>
        <FormInputsList>
          {inputs.map(({ name, type }, i) => (
            <CustomFormInput
              key={i}
              type={type}
              name={name}
              value={state[name as keyof InitialState]}
              handleChange={handleChange}
              isValid={errorMessage(name)}
              disabledIcon
            />
          ))}
        </FormInputsList>

        <ButtonBox>
          <BackButton disabled={isLoading} onClick={prevPage} />

          <Button
            id="next"
            type="submit"
            $iconPosition="l"
            Icon={IoMdAddCircle}
            $colors="accent"
            disabled={isLoading || !areAllFieldsFilled(companyData)}
            isLoading={isLoading}
          >
            Створити компанію
          </Button>
        </ButtonBox>
      </Form>
    </>
  );
};

export default FourthStep;
