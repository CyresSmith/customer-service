import Avatar from 'components/Avatar';
import Button from 'components/Ui/Buttons/Button';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import translateActivityName from 'helpers/translateActivityName';
import translateWorkSchedule from 'helpers/translateWorkSchedule';
import { useActions, useAdminRights } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import {
    HiBookOpen,
    HiBriefcase,
    HiCalendar,
    HiOfficeBuilding,
    HiPencil,
    HiPhone,
    HiPlus,
    HiX,
} from 'react-icons/hi';
import { HiQueueList, HiTableCells } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { useUploadCompanyAvatarMutation } from 'services/company.api';
import {
    AvatarBox,
    ButtonBox,
    FlexBox,
    Info,
    InfoBlock,
    InfoList,
    Name,
    StyledIcon,
    Title,
    TitleBox,
    Wrapper,
} from './CompanyProfile.styled';
import EditActivitiesModal from './EditActivitiesModal';
import EditAddressModal from './EditAddressModal';
import EditDescModal from './EditDescModal';
import EditPhonesModal from './EditPhonesModal';
import RemovePhoneModal from './RemovePhoneModal';
import SetScheduleModal from './SetScheduleModal';

enum OpenModal {
    ADD = 1,
    ADDRESS = 2,
    PHONE = 3,
    REMOVE_PHONE = 4,
    ACTIVITIES = 5,
    SCHEDULE = 6,
    DESC = 7,
}

const CompanyProfile = () => {
    const { name, avatar, address, phones, activities, id, workingHours, desc } = useCompany();
    const isAdmin = useAdminRights();
    const { setCompanyLogo } = useActions();

    const [editedPhone, setEditedPhone] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState<OpenModal | null>(null);

    const [uploadImage, { isLoading }] = useUploadCompanyAvatarMutation();

    const handleUpload = async (file: File) => {
        const data = new FormData();

        data.append('avatar', file);

        const { url } = await uploadImage({ id, data }).unwrap();

        if (url) {
            setCompanyLogo({ avatar: url });
            toast.success('Зображення успішно оновлено');
        }
    };

    const handleModalClose = () => {
        setOpenModal(null);
    };

    const handlePhoneModalClose = () => {
        setEditedPhone(null);
        handleModalClose();
    };

    return (
        <>
            {!name ? (
                <Loader />
            ) : (
                <>
                    <Wrapper>
                        <AvatarBox>
                            <Avatar
                                allowChanges={isAdmin}
                                light
                                size={250}
                                alt={`${name} logo`}
                                isLoading={isLoading}
                                currentImageUrl={avatar}
                                handleUpload={handleUpload}
                            />
                        </AvatarBox>

                        <Info>
                            <InfoBlock>
                                <p>Компанія</p>
                                <Name>{name}</Name>
                            </InfoBlock>

                            <InfoBlock>
                                <TitleBox>
                                    <StyledIcon as={HiOfficeBuilding} />
                                    <Title>Адреса:</Title>
                                </TitleBox>

                                <FlexBox>
                                    <InfoList as="p">{address}</InfoList>

                                    {isAdmin && (
                                        <Button
                                            $round
                                            $variant="text"
                                            size="s"
                                            $colors="light"
                                            Icon={HiPencil}
                                            onClick={() => {
                                                setOpenModal(OpenModal.ADDRESS);
                                            }}
                                        ></Button>
                                    )}
                                </FlexBox>
                            </InfoBlock>

                            <InfoBlock>
                                <TitleBox>
                                    <StyledIcon as={HiPhone} />
                                    <Title>Телефони:</Title>
                                </TitleBox>

                                <InfoList>
                                    {phones.map((phone: string, i) => (
                                        <li key={i}>
                                            <FlexBox>
                                                <p>{phone}</p>

                                                {isAdmin && (
                                                    <div>
                                                        <Button
                                                            $round
                                                            $variant="text"
                                                            size="s"
                                                            $colors="light"
                                                            Icon={HiPencil}
                                                            onClick={() => {
                                                                setEditedPhone(phone);
                                                                setOpenModal(OpenModal.PHONE);
                                                            }}
                                                        ></Button>

                                                        {phones.length > 1 && (
                                                            <Button
                                                                $round
                                                                $variant="text"
                                                                size="s"
                                                                $colors="danger"
                                                                Icon={HiX}
                                                                onClick={() => {
                                                                    setEditedPhone(phone);
                                                                    setOpenModal(
                                                                        OpenModal.REMOVE_PHONE
                                                                    );
                                                                }}
                                                            ></Button>
                                                        )}
                                                    </div>
                                                )}
                                            </FlexBox>
                                        </li>
                                    ))}
                                </InfoList>

                                {isAdmin && (
                                    <ButtonBox>
                                        <Button
                                            Icon={HiPlus}
                                            size="s"
                                            $colors="light"
                                            onClick={() => setOpenModal(OpenModal.PHONE)}
                                        >
                                            Додати телефон
                                        </Button>
                                    </ButtonBox>
                                )}
                            </InfoBlock>

                            <InfoBlock>
                                <TitleBox>
                                    <StyledIcon as={HiBriefcase} />
                                    <Title>Напрямки діяльності:</Title>
                                </TitleBox>

                                <InfoList>
                                    {activities.map(({ id, name }) => (
                                        <li key={id}>
                                            <p>{translateActivityName(name)}</p>
                                        </li>
                                    ))}
                                </InfoList>

                                {isAdmin && (
                                    <ButtonBox>
                                        <Button
                                            Icon={HiQueueList}
                                            size="s"
                                            $colors="light"
                                            onClick={() => setOpenModal(OpenModal.ACTIVITIES)}
                                        >
                                            Налаштувати напрямки
                                        </Button>
                                    </ButtonBox>
                                )}
                            </InfoBlock>

                            <InfoBlock>
                                <TitleBox>
                                    <StyledIcon as={HiCalendar} />
                                    <Title>Графік роботи:</Title>
                                </TitleBox>

                                {workingHours && workingHours.length ? (
                                    <InfoList>
                                        {workingHours.map(({ days, hours }, i) => (
                                            <li key={i}>
                                                <p>
                                                    {days.map((day, idx) => (
                                                        <span key={day}>
                                                            {translateWorkSchedule(day)}
                                                            {idx + 1 < days.length && (
                                                                <span>,</span>
                                                            )}{' '}
                                                        </span>
                                                    ))}

                                                    <span>з {hours?.from} </span>
                                                    <span>до {hours?.to} </span>
                                                </p>
                                            </li>
                                        ))}
                                    </InfoList>
                                ) : (
                                    <p>Графік не налаштовано</p>
                                )}

                                {isAdmin && (
                                    <ButtonBox>
                                        <Button
                                            Icon={HiTableCells}
                                            size="s"
                                            $colors="light"
                                            onClick={() => setOpenModal(OpenModal.SCHEDULE)}
                                        >
                                            Налаштувати графік
                                        </Button>
                                    </ButtonBox>
                                )}
                            </InfoBlock>

                            <InfoBlock>
                                <TitleBox>
                                    <StyledIcon as={HiBookOpen} />
                                    <Title>Опис компанії:</Title>
                                </TitleBox>

                                <InfoList as="div">
                                    <FlexBox>
                                        <p>{desc ? desc : 'Немає шнформації'}</p>

                                        {isAdmin && (
                                            <Button
                                                $round
                                                $variant="text"
                                                size="s"
                                                $colors="light"
                                                Icon={HiPencil}
                                                onClick={() => setOpenModal(OpenModal.DESC)}
                                            ></Button>
                                        )}
                                    </FlexBox>
                                </InfoList>
                            </InfoBlock>
                        </Info>
                    </Wrapper>

                    {openModal === OpenModal.ADDRESS && (
                        <Modal
                            title="Змінити адресу"
                            closeModal={handleModalClose}
                            $isOpen={openModal === OpenModal.ADDRESS}
                        >
                            <EditAddressModal closeModal={handleModalClose} />
                        </Modal>
                    )}

                    {openModal === OpenModal.PHONE && (
                        <Modal
                            title={
                                openModal === OpenModal.PHONE && editedPhone
                                    ? 'Змінити номер'
                                    : 'Додати номер'
                            }
                            closeModal={handlePhoneModalClose}
                            $isOpen={openModal === OpenModal.PHONE}
                        >
                            <EditPhonesModal
                                phone={editedPhone}
                                closeModal={handlePhoneModalClose}
                            />
                        </Modal>
                    )}

                    {openModal === OpenModal.REMOVE_PHONE && editedPhone && (
                        <Modal
                            title="Видалити номер"
                            closeModal={handlePhoneModalClose}
                            $isOpen={openModal === OpenModal.REMOVE_PHONE}
                        >
                            <RemovePhoneModal
                                phone={editedPhone}
                                closeModal={handlePhoneModalClose}
                            />
                        </Modal>
                    )}

                    {openModal === OpenModal.ACTIVITIES && (
                        <Modal
                            title="Налаштувати напрямки"
                            closeModal={handleModalClose}
                            $isOpen={openModal === OpenModal.ACTIVITIES}
                        >
                            <EditActivitiesModal closeModal={handleModalClose} />
                        </Modal>
                    )}

                    {openModal === OpenModal.SCHEDULE && (
                        <Modal
                            title="Налаштувати графік роботи"
                            closeModal={handleModalClose}
                            $isOpen={openModal === OpenModal.SCHEDULE}
                        >
                            <SetScheduleModal closeModal={handleModalClose} />
                        </Modal>
                    )}

                    {openModal === OpenModal.DESC && (
                        <Modal
                            title="Змінити опис"
                            closeModal={handleModalClose}
                            $isOpen={openModal === OpenModal.DESC}
                        >
                            <EditDescModal closeModal={handleModalClose} />
                        </Modal>
                    )}
                </>
            )}
        </>
    );
};

export default CompanyProfile;
