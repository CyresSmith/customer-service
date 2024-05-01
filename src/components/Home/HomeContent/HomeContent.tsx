import CustomForm from 'components/Ui/Form/CustomForm';
import { InputProps } from 'components/Ui/Form/types';

import { socket } from 'store/chat/socket';
import { Container } from './HomeContent.styled';

const inputs: InputProps[] = [{ name: 'message', type: 'text', value: '' }];

const initialState = { message: '' };

const HomeContent = () => {
    const handleSubmit = ({ message }: typeof initialState) => {
        socket?.emit('channel:create', message);
    };

    return (
        <Container>
            Home
            <div style={{ width: '400px', margin: '0 auto' }}>
                <CustomForm
                    inputs={inputs}
                    onSubmit={handleSubmit}
                    buttonLabel="Надіслати"
                    initialState={initialState}
                />
            </div>
        </Container>
    );
};

export default HomeContent;
