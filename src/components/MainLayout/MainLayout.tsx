import {Container, OutletWrapper} from './MainLayout.styled';
import { Outlet } from 'react-router-dom';
import { Suspense, useState } from 'react';
import TopBar from '../TopBar';
import Modal from 'components/Modal/Modal';
import CustomForm from 'components/Ui/Form/CustomForm';
import { State } from 'hooks/useForm';

const registerInputs = [
    {name: 'name', type: 'text'},
    {name: 'email', type: 'email'},
    {name: 'password', type: 'password'},
    {name: 'confirm', type: 'password'},
];

const loginInputs = registerInputs.filter(i => i.name !== 'confirm');

const initialFormState = {
    name: '',
    email: '',
    password: '',
    confirm: ''
}

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState<string | null>(null);

    const openModal = (name: string): void => {
        setIsOpen(name);
    };

    const closeModal = (): void => {
        setIsOpen(null)
    }

    const handleSubmit = (state: State) => {
        console.log(state);
    };

    return(
        <Container>
            <TopBar openModal={openModal} />
            <OutletWrapper>
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </OutletWrapper>
            {isOpen && 
                <Modal 
                    $w='20%'
                    children={<CustomForm
                                formType={isOpen}
                                onSubmit={handleSubmit}
                                initialState={initialFormState}
                                inputs={isOpen === 'register' ? registerInputs : loginInputs}
                            />}
                    open={isOpen} closeModal={closeModal}/>}
        </Container>
    )
};

export default MainLayout;