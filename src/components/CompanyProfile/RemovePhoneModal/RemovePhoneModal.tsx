import Button from 'components/Ui/Buttons/Button';
import { useActions } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useEffect } from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUpdateCompanyProfileMutation } from 'services/company.api';
import { ButtonBox, Message, Phone, RemovePhoneBox } from './RemovePhoneModal.styled';

type Props = { phone: string; closeModal: () => void };

const RemovePhoneModal = ({ phone, closeModal }: Props) => {
    const { id, phones } = useCompany();

    const [updatePhones, { isLoading, isSuccess }] = useUpdateCompanyProfileMutation();

    const { updateCompanyData } = useActions();

    const removePhone = async () => {
        const data = { phones: phones.filter(item => item !== phone) };

        const { message } = await updatePhones({
            id,
            data,
        }).unwrap();

        if (message) updateCompanyData(data);

        closeModal();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Телефон видалено!');
        }
    }, [isSuccess]);

    return (
        <RemovePhoneBox>
            <Message>
                <span>Ви дійсно бажаєте видалити номер?</span>
                <Phone>{phone}</Phone>
            </Message>

            <ButtonBox>
                <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    Icon={HiCheck}
                    $colors="success"
                    onClick={removePhone}
                >
                    Так
                </Button>

                <Button disabled={isLoading} Icon={HiX} $colors="danger">
                    Ні
                </Button>
            </ButtonBox>
        </RemovePhoneBox>
    );
};

export default RemovePhoneModal;
