import { useClients } from "hooks/useClients";
import { List, NoClients } from "./ClientsList.styled"
import ClientsListItem from "./ClientsListItem";
import { Client } from "store/clients/clients.types";
import { useEffect, useState } from "react";

type Props = {
    search: string;
};

const ClientsList = ({search}: Props) => {
    const { allClients } = useClients();
    const [clients, setClients] = useState<Client[]>(allClients);

    useEffect(() => {
        if (search) {
            setClients(allClients.filter(client => client.phone.includes(search)))
        } else {
            setClients(allClients)
        }
    }, [allClients, search])

    return (
        <>
            <List>
                {clients.map((client, i) => <ClientsListItem key={i} client={client} />)}
            </List>
            {clients.length === 0 && search &&
                <NoClients>{`Не знайдено клієнта за номером телефону ${search}, створіть нового.`}</NoClients>
            }
            {allClients.length === 0 && <NoClients>Список клієнтів порожній. Створите першого?</NoClients>}
        </>
    )
};

export default ClientsList;