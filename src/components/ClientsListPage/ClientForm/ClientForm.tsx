import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { InputProps } from 'components/Ui/Form/types';
import { useForm } from 'hooks/useForm';
import {
  ButtonsBox,
  Form,
  FormInputsList,
  FormInputsListItem,
  FormSidesWrapper,
  FormTitle,
  SubmitBtnWrapper,
  SubmitError,
  SubmitErrorsBox,
} from './ClientForm.styled';
import { Client } from 'store/clients/clients.types';
import { IoMdSave  } from 'react-icons/io';

// type Social = { name: string, link: string };
// type ClientsSocial = {socials: Social[]};
// type ClientsInputs = (InputProps | ClientsSocial)[];

const inputs: InputProps[] = [
  { name: 'firstName', type: 'text', isRequired: true },
  { name: 'lastName', type: 'text' },
  { name: 'birthday', type: 'date' },
  { name: 'phone', type: 'text', isRequired: true },
  { name: 'email', type: 'email' },
  { name: 'gender', type: 'text' },
  { name: 'discount', type: 'text' },
  { name: 'card', type: 'text' },
  { name: 'source', type: 'text' },
  { name: 'comments', type: 'textarea' },
];

type Props = {
  initialState: Client;
  onSubmit: (state: Client) => void;
  isLoading: boolean;
  type: string;
};

const ClientForm = ({initialState, onSubmit, isLoading, type}: Props) => {
  

  const { state, handleChange, handleSubmit, invalidFields } = useForm<Client>(
    initialState,
    onSubmit,
  );

  const disabledReset: boolean =
    JSON.stringify(state) === JSON.stringify(initialState) ? true : false;

  const disabledSubmit: boolean =
    invalidFields?.length > 0 ||
    disabledReset ||
    (state.firstName === '' && state.phone === '')
      ? true
      : false;

  return (
    <Form onSubmit={handleSubmit}>
      {type === 'add' && <FormTitle>Новий клієнт</FormTitle>}
      <FormSidesWrapper>
        <FormInputsList>
          {inputs.map(({ name, type, isRequired }, i) => (
            <FormInputsListItem
              className={type === 'textarea' ? 'textarea' : i.toString()}
              key={i}
            >
              <CustomFormInput
                name={name}
                type={type}
                isRequired={isRequired}
                value={state[name as keyof Client]}
                handleChange={handleChange}
                disabledIcon={true}
              />
            </FormInputsListItem>
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
