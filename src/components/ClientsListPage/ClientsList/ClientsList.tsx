import { useClients } from "hooks/useClients";
import { List, NoClients } from "./ClientsList.styled"
import ClientsListItem from "./ClientsListItem";
import { Client } from "store/clients/clients.types";
import { useEffect, useState } from "react";
import ClientProfile from "../ClientProfile";
import Modal from "components/Ui/Modal/Modal";
import { useDeleteMutation } from "services/clients.api";
import { toast } from "react-toastify";
import { useActions } from "hooks";

type Props = {
    search: string;
    companyId?: string;
    isLoading: boolean;
    refetchAll: () => void;
};

const ClientsList = ({search, companyId, isLoading, refetchAll}: Props) => {
    const { allClients } = useClients();
    const [clients, setClients] = useState<Client[]>(allClients);
    const [modalOpen, setModalOpen] = useState<null | number>(null);
    const [deleteClientMutation, { isLoading: deleteLoading, isSuccess }] = useDeleteMutation();
    const { deleteClient } = useActions();

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

    const handleClientDelete = async (id: number) => {
        if (companyId && id) {
            const { message } = await deleteClientMutation({ companyId: +companyId, id }).unwrap();
            if (message) {
                closeModal();
                deleteClient({ id });
            }
        }
    };

    useEffect(() => {
        if (isSuccess) {
            refetchAll();
            toast.success('Клієнта видалено');
        }
    }, [isSuccess, refetchAll]);

    return companyId && (
        <>
            {clients.length > 0 &&
                <List>
                    {clients.map((client, i) => <ClientsListItem handleClick={handleClientClick} key={i} client={client} idx={i} />)}
                </List>
            }
            {clients.length === 0 && search && !isLoading &&
                <NoClients>{`Не знайдено клієнта за номером телефону ${search}, створіть нового.`}</NoClients>
            }
            {allClients.length === 0 && !isLoading && <NoClients>Список клієнтів порожній. Створите першого?</NoClients>}
            {modalOpen && (
                <Modal
                    children={<ClientProfile deleteLoading={deleteLoading} deleteClient={handleClientDelete} companyId={+companyId} id={modalOpen} />}
                    $isOpen={modalOpen ? true : false}
                    closeModal={closeModal}
                />
            )}
        </>
    )
};

export default ClientsList;