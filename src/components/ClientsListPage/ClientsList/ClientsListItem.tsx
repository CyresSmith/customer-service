import { Client } from "store/clients/clients.types";
import { Avatar, AvatarWrapper, ListItem, Name } from "./ClientsList.styled"

type Props = {
    client: Client;
};

const ClientsListItem = ({ client }: Props) => {
    const { avatar, firstName } = client;

    return (
        <ListItem>
            <AvatarWrapper>
                {avatar ? <Avatar src={avatar} alt='Photo' /> : firstName[0].toUpperCase()}
            </AvatarWrapper>
            <Name>{ firstName }</Name>
        </ListItem>
    )
};

export default ClientsListItem;