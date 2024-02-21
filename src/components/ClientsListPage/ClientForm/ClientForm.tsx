import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { InputProps } from 'components/Ui/Form/types';
import { useForm } from 'hooks/useForm';
import {
  ButtonsBox,
  Form,
  FormInputsList,
  FormSidesWrapper,
  FormTitle,
  SubmitBtnWrapper,
  SubmitError,
  SubmitErrorsBox,
} from './ClientForm.styled';
import { Client } from 'store/clients/clients.types';
import { IoMdSave } from 'react-icons/io';

const inputs: InputProps[] = [
  { name: 'firstName', type: 'text', isRequired: true },
  { name: 'lastName', type: 'text' },
  { name: 'birthday', type: 'date' },
  { name: 'phone', type: 'text', isRequired: true },
  { name: 'email', type: 'email' },
  { name: 'gender', type: 'select' },
  { name: 'discount', type: 'text' },
  { name: 'card', type: 'text' },
  { name: 'source', type: 'text' },
  { name: 'comment', type: 'textarea', placeholder: 'Побажання клієнта, додаткова інформація, примітки адміністратора..' },
];

const genderOptions: string[] = ['male', 'female', 'other'];

type Props = {
  initialState: Client;
  onSubmit: (state: Client) => void;
  isLoading: boolean;
  type: string;
};

const ClientForm = ({initialState, onSubmit, isLoading, type}: Props) => {
  const { state, setState, handleChange, handleSubmit, invalidFields } = useForm<Client>(
    initialState,
    onSubmit,
  );

  const disabledReset: boolean =
    JSON.stringify(
      Object.fromEntries(Object.entries(state).filter(i => i[0] !== 'avatar' && i[0] !== 'updatedAt'))
    ) ===
      JSON.stringify(
        Object.fromEntries(
          Object.entries(initialState).filter(i => i[0] !== 'avatar' && i[0] !== 'updatedAt')
        ))

  const disabledSubmit: boolean =
    invalidFields?.length > 0 ||
    disabledReset ||
    (state.firstName === '' && state.phone === '')
      ? true
      : false;
  
  const handleSelect = (item: string) => {
    setState({ ...state, gender: item })
  };

  return (
    <Form onSubmit={handleSubmit}>
      {type === 'add' && <FormTitle>Новий клієнт</FormTitle>}
      <FormSidesWrapper>
        <FormInputsList>
          {inputs.map(({ name, type, isRequired, placeholder }, i) => (
            <CustomFormInput
              key={i}
              name={name}
              type={type}
              isRequired={isRequired}
              value={state[name as keyof Client]}
              handleChange={handleChange}
              disabledIcon={true}
              selectItems={genderOptions}
              handleSelect={handleSelect}
              placeholder={placeholder}
            />
          ))}
        </FormInputsList>
      </FormSidesWrapper>
      <ButtonsBox>
        {/* <Button children='Видалити' type="button" $colors="light" /> */}
        <SubmitBtnWrapper>
          <Button
            disabled={disabledSubmit}
            children="Зберегти"
            type="submit"
            $colors="accent"
            isLoading={isLoading}
            Icon={IoMdSave}
          />
          {invalidFields.length > 0 && (
            <SubmitErrorsBox>
              {invalidFields.map((item, i) => (
                <SubmitError key={i}>
                  {Object.keys(item)[0] === 'phone' ? 'Телефон - ' : "Ім'я - "}
                  {Object.values(item)[0]}
                </SubmitError>
              ))}
            </SubmitErrorsBox>
          )}
        </SubmitBtnWrapper>
      </ButtonsBox>
    </Form>
  );
};

export default ClientForm;
