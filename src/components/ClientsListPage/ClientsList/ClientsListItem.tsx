import { Client } from "store/clients/clients.types";
import { Avatar, AvatarWrapper, ListItem, Name } from "./ClientsList.styled"
import useMountTransition from "hooks/useMountTransition";

type Props = {
    client: Client;
    handleClick: (id: number) => void;
    idx: number;
};

const ClientsListItem = ({ client, idx, handleClick }: Props) => {
    const { avatar, firstName } = client;
    const transition = useMountTransition({isMounted: true, mountDelay: idx * 100});

    return transition && (
        <ListItem onClick={() => handleClick(+client.id)}>
            <AvatarWrapper>
                {avatar ? <Avatar src={avatar} alt='Photo' /> : firstName[0].toUpperCase()}
            </AvatarWrapper>
            <Name>{ firstName }</Name>
        </ListItem>
    )
};

export default ClientsListItem;