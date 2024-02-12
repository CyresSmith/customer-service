import Button from "components/Ui/Buttons/Button"
import { AvaSkeleton, BtnWrapper, LeftSideWrapper, SidesWrapper } from "../ClientProfile.styled"
import { Client } from "store/clients/clients.types";
import ClientForm from "components/ClientsListPage/ClientForm";

type Props = {
    handleUpdate: (state: Client) => void;
    initialState: Client;
}

export const Profile = ({handleUpdate, initialState}: Props) => {
    return (
        <SidesWrapper>
            <LeftSideWrapper>
                <AvaSkeleton />
                <BtnWrapper>
                    <Button type='button' children='Видалити' $colors="light" />
                </BtnWrapper>
            </LeftSideWrapper>
            <ClientForm type='update' onSubmit={handleUpdate} isLoading={false} initialState={initialState} />
        </SidesWrapper>
    )
}