import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import { MessageBox, UserBox } from './IncomingMessage.styled';

type Props = { from: number; content: string };

const IncomingMessage = ({ content }: Props) => {
    return (
        <MessageBox>
            <UserBox>
                <ItemAvatar avatar={''} name={'senderName'} />

                <span>{'senderName'}</span>
            </UserBox>

            <p>{content}</p>
        </MessageBox>
    );
};

export default IncomingMessage;
