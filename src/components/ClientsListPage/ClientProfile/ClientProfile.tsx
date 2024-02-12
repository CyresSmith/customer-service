import { useClients } from "hooks/useClients";
import { ClientName, Container, Skeleton } from "./ClientProfile.styled";
import { Client } from "store/clients/clients.types";
import { useGetByIdQuery } from "services/clients.api";
import { useEffect, useState } from "react";
import { useActions } from "hooks";
import Loader from "components/Ui/Loader";
import { ClientProfileBar } from "./ClientProfileBar";
import { Profile } from "./ClientProfileComponents/Profile";

type Props = {
    companyId: number;
    id: number;
}

const ClientProfile = ({companyId, id}: Props) => {
    const { data, isLoading } = useGetByIdQuery({ companyId, id });
    const { setChoosenClient } = useActions();
    const { choosen } = useClients();
    const [section, setSection] = useState<string>('profile')

    useEffect(() => {
        if (data) {
            setChoosenClient(data);
        }
    }, [data, setChoosenClient])

    const handleBarClick = (id: string): void => {
        setSection(id)
    }
    
    const handleUpdate = (state: Client): void => {
        console.log(state);
    }

    return isLoading || id != choosen.id ?
        <Skeleton><Loader /></Skeleton> : (
        <Container>
            <ClientName>{ choosen.firstName + ' ' + choosen.lastName }</ClientName>
            <ClientProfileBar handleClick={handleBarClick} isActiveSection={section} />
            {section === 'profile' ?
                <Profile handleUpdate={handleUpdate} initialState={choosen} /> : <Skeleton />
            }
        </Container>
    )
};

export default ClientProfile;