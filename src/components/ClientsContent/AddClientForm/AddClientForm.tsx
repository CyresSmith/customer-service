import Button from "components/Ui/Buttons/Button";
import { ButtonsBox, Form, FormInputsList, FormInputsListItem, FormSidesWrapper, FormTitle, SubmitBtnWrapper, SubmitError, SubmitErrorsBox } from "./AddClientForm.styled";
import { InputProps } from "components/Ui/Form/types";
import CustomFormInput from "components/Ui/Form/CustomFormInput";
import { State, useForm, } from "hooks/useForm";

// type Social = { name: string, link: string };
// type ClientsSocial = {socials: Social[]};
// type ClientsInputs = (InputProps | ClientsSocial)[];

const inputs: InputProps[] = [
    { name: 'firstName', type: 'text', isRequiried: true },
    { name: 'lastName', type: 'text' },
    { name: 'birthday', type: 'date' },
    { name: 'phone', type: 'text', isRequiried: true },
    { name: 'email', type: 'email' },
    { name: 'sex', type: 'text' },
    { name: 'discount', type: 'text' },
    { name: 'card', type: 'text' },
    { name: 'source', type: 'text' },
    { name: 'comments', type: 'textarea' },
]

const initialState: State = {
    firstName: '',
    lastName: '',
    birthday: '',
    phone: '',
    email: '',
    sex: '',
    discount: '',
    card: '',
    sourse: '',
    coments: ''
}

const AddClientsForm = () => {
    const onSubmit = (state: State) => {
        console.log(state)
    };

    const { state, handleChange, handleSubmit, invalidFields } = useForm({ initialState, onSubmit });

    const disabledReset: boolean =
        JSON.stringify(state) ===
        JSON.stringify(initialState) ?
        true :
        false;

    const disabledSubmit: boolean = invalidFields?.length > 0 || disabledReset ||
        state.firstName === '' && state.phone === ''
        ? true
        : false;
    
    console.log(invalidFields)

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle>Новий клієнт</FormTitle>
            <FormSidesWrapper>
                <FormInputsList>
                    {inputs.map(({name, type, isRequiried}, i) =>
                        <FormInputsListItem className={type === 'textarea' ? 'textarea' : i.toString()} key={i}>
                            <CustomFormInput
                                name={name}
                                type={type}
                                isRequiried={isRequiried}
                                value={state[name as keyof State]}
                                handleChange={handleChange}
                                disabledIcon={true}
                            />
                        </FormInputsListItem>
                        )}
                </FormInputsList>
            </FormSidesWrapper>
            <ButtonsBox>
                {/* <Button children='Видалити' type="button" $colors="light" /> */}
                <SubmitBtnWrapper>
                    <Button disabled={disabledSubmit} children='Зберегти' type="submit" $colors="accent" />
                    {invalidFields.length > 0 &&
                        <SubmitErrorsBox>
                            {invalidFields.map(i => <SubmitError>{ Object.keys(i)[0] === 'phone' ? 'Телефон - ' : "Ім'я - " }{Object.values(i)[0]}</SubmitError>)}
                        </SubmitErrorsBox>
                    }
                </SubmitBtnWrapper>
            </ButtonsBox>
        </Form>
    )
};

export default AddClientsForm;