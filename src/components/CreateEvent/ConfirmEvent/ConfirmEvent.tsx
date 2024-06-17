import ClientProfile from 'components/ClientsListPage/ClientProfile';
import EmployeeModal from 'components/Employees/EmployeeModal';
import ServiceModal from 'components/Services/ServiceModal';
import ItemsList from 'components/Ui/ItemsList';
import { AvatarSize } from 'components/Ui/ItemsList/ItemsList.styled';
import Modal from 'components/Ui/Modal/Modal';
import ModalHeaderWithAvatar from 'components/Ui/Modal/ModalHeaderWithAvatar';
import { format } from 'date-fns';
import { ServiceOpenModal } from 'helpers/enums';
import { millisecondsToTime } from 'helpers/millisecondsToTime';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useState } from 'react';
import { Client } from 'services/types/clients.types';
import { IEmployee } from 'services/types/employee.types';
import { ServiceBasicInfo } from 'services/types/service.type';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import {
    Container,
    EventInfoBox,
    EventInfoList,
    ListItemText,
    ListItemTitle,
    SubjectDetails,
    Total,
    TotalInfo,
} from './ConfirmEvent.styled';

type Props = {
    chosenEmployee: IEmployee;
    chosenServices: ServiceBasicInfo[];
    eventDate: Date;
    eventTime: string;
    chosenClient: Client;
    eventDuration: number;
    setServices?: Dispatch<SetStateAction<ServiceBasicInfo[]>>;
};

enum openModal {
    CLIENT = 'c',
    EMPLOYEE = 'e',
    SERVICE = 's',
}

const ConfirmEvent = ({
    chosenEmployee,
    chosenServices,
    eventDate,
    eventTime,
    chosenClient,
    eventDuration,
    setServices,
}: Props) => {
    const { avatar, firstName, lastName, phone, id: clientId } = chosenClient;
    const {
        avatar: employeeAvatar,
        firstName: employeeFirsName,
        lastName: employeeLastName,
        jobTitle,
        id: employeeId,
    } = chosenEmployee;

    const { id: companyId } = useCompany();
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);
    const isTablet = useMediaQuery(theme.breakpoints.tablet.media);
    const [modalOpen, setModalOpen] = useState<openModal | ServiceOpenModal | null>(null);
    const [serviceId, setServiceId] = useState<number | null>(null);

    const closeModal = () => setModalOpen(null);

    const handleServiceDelete = (serviceId: number) => {
        setServices && setServices(p => p.filter(({ id }) => id !== serviceId));
    };

    const totalPrice = (): number => {
        return chosenServices?.reduce((acc, cs) => (cs.price ? acc + +cs.price : acc), 0) || 0;
    };

    const services = chosenServices.map(({ name, duration, price, id }) => {
        let service = {
            id,
            name,
        };

        if (isTablet) service = Object.assign(service, { price });
        if (isDesktop) service = Object.assign(service, { price, duration });

        return service;
    });

    return (
        <>
            <Container>
                <EventInfoList>
                    <div>
                        <EventInfoBox>
                            <ListItemTitle $mb={false}>Дата:</ListItemTitle>
                            <ListItemText>{format(eventDate, 'PPPP')}</ListItemText>
                        </EventInfoBox>
                        <EventInfoBox>
                            <ListItemTitle $mb={false}>Час:</ListItemTitle>
                            <ListItemText>{eventTime}</ListItemText>
                        </EventInfoBox>
                    </div>
                    <li>
                        <ListItemTitle>Виконавець:</ListItemTitle>

                        <SubjectDetails onClick={() => setModalOpen(openModal.EMPLOYEE)}>
                            <ModalHeaderWithAvatar
                                avatar={employeeAvatar}
                                title={employeeFirsName + ' ' + employeeLastName}
                                subtitle={jobTitle}
                                avatarSize={AvatarSize.S}
                            />
                        </SubjectDetails>
                    </li>
                    <li>
                        <ListItemTitle>Клієнт:</ListItemTitle>

                        <SubjectDetails onClick={() => setModalOpen(openModal.CLIENT)}>
                            <ModalHeaderWithAvatar
                                avatar={avatar}
                                title={firstName + ' ' + lastName}
                                subtitle={phone}
                                avatarSize={AvatarSize.S}
                            />
                        </SubjectDetails>
                    </li>
                    <li>
                        <ListItemTitle>
                            Послуги:{' '}
                            {chosenServices.length > 0 && <span>{chosenServices.length}</span>}
                        </ListItemTitle>

                        <ItemsList
                            items={services}
                            listHeader={false}
                            listSortPanel={false}
                            notSortedKeys={['name', 'duration', 'price']}
                            onItemClick={id => {
                                setServiceId(id);
                                setModalOpen(ServiceOpenModal.EDIT_SERVICE);
                            }}
                            avatarSize={AvatarSize.S}
                            onItemDeleteClick={setServices ? handleServiceDelete : undefined}
                        />
                    </li>
                </EventInfoList>

                <Total>
                    <span>Загалом:</span>
                    <TotalInfo>{millisecondsToTime(eventDuration)}</TotalInfo>
                    <TotalInfo>{totalPrice()} грн</TotalInfo>
                </Total>
            </Container>

            {modalOpen === openModal.CLIENT && (
                <Modal $isOpen={modalOpen === openModal.CLIENT} closeModal={closeModal}>
                    <ClientProfile
                        clientId={clientId}
                        companyId={companyId}
                        closeModal={closeModal}
                    />
                </Modal>
            )}

            {modalOpen === openModal.EMPLOYEE && (
                <Modal $isOpen={modalOpen === openModal.EMPLOYEE} closeModal={closeModal}>
                    <EmployeeModal id={employeeId} />
                </Modal>
            )}

            {modalOpen === ServiceOpenModal.EDIT_SERVICE && serviceId && (
                <ServiceModal
                    openModal={modalOpen}
                    serviceId={serviceId}
                    handleModalClose={closeModal}
                />
            )}
        </>
    );
};

export default ConfirmEvent;
