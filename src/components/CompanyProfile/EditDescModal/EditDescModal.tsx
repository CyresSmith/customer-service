import Button from 'components/Ui/Buttons/Button';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUpdateCompanyProfileMutation } from 'services/company.api';
import { ModalBox } from '../CompanyProfile.styled';
import { Form } from './EditDescModal.styled';

type Props = { closeModal: () => void };

const EditDescModal = ({ closeModal }: Props) => {
    const { id, desc } = useCompany();
    const { updateCompanyData } = useActions();

    const [uploadDesc, { isLoading, isSuccess }] = useUpdateCompanyProfileMutation();

    const onSubmit = async (state: { desc: string }) => {
        if (state?.desc) {
            const { message } = await uploadDesc({
                id,
                data: state,
            }).unwrap();

            if (message) updateCompanyData(state);

            closeModal();
        }
    };

    const initialState = { desc: desc ? desc : '' };

    const { handleChange, handleSubmit, state, invalidFields, reset } = useForm<
        typeof initialState
    >(initialState, onSubmit);

    const errorMessage = (name: string): string | undefined => {
        const error = invalidFields.find(f => Object.keys(f)[0] === name);
        if (error) {
            return Object.values(error)[0];
        }
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
            toast.success('Опис оновлено');
        }
    }, [isSuccess, reset]);

    return (
        <ModalBox>
            <Form onSubmit={handleSubmit}>
                <CustomFormInput
                    name="desc"
                    type="textarea"
                    value={state.desc}
                    handleChange={handleChange}
                    disabledIcon
                    isValid={errorMessage('desc')}
                />

                <div>
                    <Button
                        disabled={
                            isLoading ||
                            Boolean(errorMessage('desc')) ||
                            state.desc === '' ||
                            state.desc === desc
                        }
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
