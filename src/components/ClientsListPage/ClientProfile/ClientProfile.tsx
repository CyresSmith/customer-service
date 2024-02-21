import { useClients } from "hooks/useClients";
import { ClientName, Container, Skeleton } from "./ClientProfile.styled";
import { useGetByIdQuery } from "services/clients.api";
import { useEffect, useState } from "react";
import { useActions } from "hooks";
import Loader from "components/Ui/Loader";
import { ClientProfileBar } from "./ClientProfileBar";
import { Profile } from "./ClientProfileComponents/Profile";

type Props = {
    companyId: number;
    id: number;
    deleteClient: (id: number) => void;
    deleteLoading: boolean;
}

const ClientProfile = ({ companyId, id, deleteClient, deleteLoading }: Props) => {
    const { data, isLoading, refetch } = useGetByIdQuery({ companyId, id });
    const { setChoosenClient } = useActions();
    const { choosen } = useClients();
    const [section, setSection] = useState<string>('profile');

    useEffect(() => {
        if (data) {
            setChoosenClient(data);
        }
    }, [data, setChoosenClient])

    const handleBarClick = (id: string): void => {
        setSection(id)
    }

    return isLoading || id != choosen.id ?
        <Skeleton><Loader /></Skeleton> : (
        <Container>
            <ClientName>{ choosen.firstName + ' ' + choosen.lastName }</ClientName>
            <ClientProfileBar handleClick={handleBarClick} isActiveSection={section} />
            {section === 'profile' ?
                <Profile deleteLoading={deleteLoading} deleteClient={deleteClient} companyId={companyId} clientRefetch={refetch} /> : <Skeleton />
            }
        </Container>
    )
};

export default ClientProfile;