import { ButtonBox } from 'components/CompanyProfile/RemovePhoneModal/RemovePhoneModal.styled';
import Button from 'components/Ui/Buttons/Button';
import Modal from 'components/Ui/Modal/Modal';
import { useState } from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import { UserData } from 'store/user/user.types';
import { FormBox, Message } from './AddEmployeeModal.styled';
import ExistAccountForm from './ExistAccountForm';
import FindUserForm from './FindUserForm';
import NewUserEmployeeForm from './NewUserEmployeeForm';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
};

const AddEmployeeModal = ({ isOpen, closeModal }: Props) => {
    const [step, setStep] = useState<null | 1 | 2>(null);
    const [existUser, setExistUser] = useState<UserData | null>(null);

    const handleBackClick = () => {
        setStep(null);
        setExistUser(null);
    };

    const handleModalClose = () => {
        handleBackClick();
        closeModal();
    };

    return (
        <Modal
            $w="650px"
            id="addEmployeeModal"
            title="Додать співробітника"
            $isOpen={isOpen}
            closeModal={closeModal}
        >
            <FormBox>
                {!step && (
                    <>
                        <Message>
                            <span>Чи має співробітник аккаунт на сервісі?</span>
                        </Message>

                        <ButtonBox>
                            <Button Icon={HiCheck} $colors="light" onClick={() => setStep(1)}>
                                Так
                            </Button>

                            <Button Icon={HiX} $colors="light" onClick={() => setStep(2)}>
                                Ні
                            </Button>
                        </ButtonBox>
                    </>
                )}

                {step === 1 && (
                    <>
                        <FindUserForm
                            handleBackClick={handleBackClick}
                            existUser={existUser}
                            setExistUser={setExistUser}
                        />
                        {existUser && (
                            <ExistAccountForm
                                closeModal={handleModalClose}
                                userId={existUser.id}
                                handleBackClick={handleBackClick}
                            />
                        )}
                    </>
                )}

                {step === 2 && (
                    <NewUserEmployeeForm
                        closeModal={handleModalClose}
                        handleBackClick={handleBackClick}
                    />
                )}
            </FormBox>
        </Modal>
    );
};

export default AddEmployeeModal;
