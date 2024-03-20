import Loader from 'components/Ui/Loader';
import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import ModalSectionsList from 'components/Ui/Modal/ModalSectionsList';
import { useActions } from 'hooks';
import { useClients } from 'hooks/useClients';
import { useEffect, useState } from 'react';
import { HiIdentification } from 'react-icons/hi2';
import { useGetByIdQuery } from 'services/clients.api';
import { Container, Skeleton } from './ClientProfile.styled';
import { Profile } from './ClientProfileComponents/Profile';

type Props = {
  companyId: number;
  clientId: number;
  refetchClients: () => void;
  closeModal: () => void;
};

enum Sections {
  PROFILE = 1,
}

const sectionButtons = [
  { id: Sections.PROFILE, label: 'Інформація', Icon: HiIdentification },
];

const ClientProfile = ({
  companyId,
  clientId,
  refetchClients,
  closeModal,
}: Props) => {
  const { data, isLoading, refetch } = useGetByIdQuery({ companyId, clientId });
  const { setChosenClient } = useActions();
  const { chosen } = useClients();
  const [section, setSection] = useState<Sections>(Sections.PROFILE);

  useEffect(() => {
    if (data) {
      setChosenClient(data);
    }
  }, [data, setChosenClient]);

  return isLoading || clientId !== chosen.id || !chosen ? (
    <Skeleton>
      <Loader />
    </Skeleton>
  ) : (
    <Container>
      <ModalHeaderWithAvatar
        avatar={chosen.avatar || ''}
        title={
          chosen.lastName
            ? chosen.firstName + ' ' + chosen.lastName
            : chosen.firstName || ''
        }
      />

      <ModalSectionsList
        sectionButtons={sectionButtons}
        currentSection={section}
        handleSectionSelect={id => setSection(id)}
      />

      {section === Sections.PROFILE ? (
        <Profile
          companyId={companyId}
          clientRefetch={refetchClients}
          closeModal={closeModal}
          refetchChosen={refetch}
        />
      ) : (
        <Skeleton />
      )}
    </Container>
  );
};

export default ClientProfile;
