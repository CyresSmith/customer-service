import { useClients } from "hooks/useClients";
import { List, NoClients } from "./ClientsList.styled"
import ClientsListItem from "./ClientsListItem";
import { Client } from "store/clients/clients.types";
import { useEffect, useState } from "react";
import ClientProfile from "../ClientProfile";
import Modal from "components/Ui/Modal/Modal";

type Props = {
    search: string;
    companyId?: string;
};

const ClientsList = ({search, companyId}: Props) => {
    const { allClients } = useClients();
    const [clients, setClients] = useState<Client[]>(allClients);
    const [modalOpen, setModalOpen] = useState<null | number>(null);

    const closeModal = (): void => {
        setModalOpen(null)
    };

    useEffect(() => {
        if (search) {
            setClients(allClients.filter(client => client.phone.includes(search)))
        } else {
            setClients(allClients)
        }
    }, [allClients, search]);

    const handleClientClick = (id: number) => {
        setModalOpen(+id)
    };

    return companyId && (
        <>
            <List>
                {clients.map((client, i) => <ClientsListItem handleClick={handleClientClick} key={i} client={client} />)}
            </List>
            {clients.length === 0 && search &&
                <NoClients>{`Не знайдено клієнта за номером телефону ${search}, створіть нового.`}</NoClients>
            }
            {allClients.length === 0 && <NoClients>Список клієнтів порожній. Створите першого?</NoClients>}
            {modalOpen && (
                <Modal
                    children={<ClientProfile companyId={+companyId} id={modalOpen} />}
                    $isOpen={modalOpen ? true : false}
                    closeModal={closeModal}
                />
            )}
        </>
    )
};

export default ClientsList;