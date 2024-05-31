import Loader from 'components/Ui/Loader';
import { ModalHeaderBox } from 'components/Ui/Modal/Modal.styled';
import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import { useState } from 'react';
import { HiIdentification } from 'react-icons/hi2';
import { useGetByIdQuery } from 'services/clients.api';
import { Container, Skeleton } from './ClientProfile.styled';
import { Profile } from './ClientProfileComponents/Profile';

type Props = {
    companyId: number;
    clientId: number;
    closeModal: () => void;
};

enum Sections {
    PROFILE = 1,
}

const sectionButtons = [{ id: Sections.PROFILE, label: 'Інформація', Icon: HiIdentification }];

const ClientProfile = ({ companyId, clientId, closeModal }: Props) => {
    const { data, isLoading } = useGetByIdQuery({
        companyId,
        id: clientId,
    });
    const [section, setSection] = useState<Sections>(Sections.PROFILE);

    return isLoading || !data || clientId !== data.id ? (
        <Skeleton>
            <Loader />
        </Skeleton>
    ) : (
        <Container>
            <ModalHeaderBox>
                <ModalHeaderWithAvatar
                    avatar={data.avatar || ''}
                    title={
                        data.lastName ? data.firstName + ' ' + data.lastName : data.firstName || ''
                    }
                    subtitle={data.phone}
                />

                <ModalSectionsList
                    sectionButtons={sectionButtons}
                    currentSection={section}
                    handleSectionSelect={id => setSection(id)}
                />
            </ModalHeaderBox>

            {section === Sections.PROFILE ? (
                <Profile companyId={companyId} client={data} closeModal={closeModal} />
            ) : (
                <Skeleton />
            )}
        </Container>
    );
};

export default ClientProfile;
