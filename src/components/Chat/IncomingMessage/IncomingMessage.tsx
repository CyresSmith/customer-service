import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import { MessageBox, UserBox } from './IncomingMessage.styled';

type Props = { from: number; content: string };

const IncomingMessage = ({ from, content }: Props) => {
    // const { id: companyId } = useCompany();
    // const { data } = useGetCompanyEmployeesQuery(companyId);

    // const sender = data?.find(({ id }) => id === from);

    // const senderName = sender?.lastName
    //     ? sender?.firstName + ' ' + sender?.lastName
    //     : sender?.firstName;

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
