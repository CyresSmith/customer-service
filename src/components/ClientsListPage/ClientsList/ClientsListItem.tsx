import { Client } from "store/clients/clients.types";
import { Avatar, AvatarWrapper, ListItem, Name } from "./ClientsList.styled"

type Props = {
    client: Client;
    handleClick: (id: number) => void;
};

const ClientsListItem = ({ client, handleClick }: Props) => {
    const { avatar, firstName } = client;

    return (
        <ListItem onClick={() => handleClick(+client.id)}>
            <AvatarWrapper>
                {avatar ? <Avatar src={avatar} alt='Photo' /> : firstName[0].toUpperCase()}
            </AvatarWrapper>
            <Name>{ firstName }</Name>
        </ListItem>
    )
};

export default ClientsListItem;