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
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUploadCompanyAvatarMutation } from 'services/company.api';
import {
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

const CompanyProfile = () => {
  const { name, avatar, address, phones, activities, id, workingHours, desc } =
    useCompany();
  const isAdmin = useAdminRights();

  const [editedPhone, setEditedPhone] = useState<string | null>(null);

  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const [openModal, setOpenModal] = useState<string | null>(null);

  const { setCompanyLogo } = useActions();

  const [uploadImage, { isLoading }] = useUploadCompanyAvatarMutation();

  const handleUpload = async (file: File) => {
    const data = new FormData();

    data.append('avatar', file);

    const { url } = await uploadImage({ id, data }).unwrap();

    if (url) {
      setCompanyLogo({ avatar: url });
      refetchCompanyData();
      toast.success('Зображення успішно оновлено');
    }
  };

  const handleModalClose = () => {
    refetchCompanyData();
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
            <Avatar
              allowChanges={isAdmin}
              light
              size={250}
              alt={`${name} logo`}
              isLoading={isLoading}
              currentImageUrl={avatar}
              handleUpload={handleUpload}
            />

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
                        setOpenModal('address');
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
                                setOpenModal('phone');
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
                                  setOpenModal('removePhone');
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
                      onClick={() => setOpenModal('phone')}
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
                      onClick={() => setOpenModal('activities')}
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
                    {workingHours.map(({ days, schedule }, i) => (
                      <li key={i}>
                        <p>
                          {days.map(day => (
                            <span key={day}>{translateWorkSchedule(day)} </span>
                          ))}

                          <span>з {schedule.from} </span>
                          <span>до {schedule.to} </span>
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
                      onClick={() => setOpenModal('schedule')}
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
                        onClick={() => setOpenModal('desc')}
                      ></Button>
                    )}
                  </FlexBox>
                </InfoList>
              </InfoBlock>
            </Info>
          </Wrapper>

          {openModal === 'address' && (
            <Modal
              title="Змінити адресу"
              closeModal={handleModalClose}
              $isOpen={openModal === 'address'}
            >
              <EditAddressModal closeModal={handleModalClose} />
            </Modal>
          )}

          {(openModal === 'phone' ||
            (openModal === 'removePhone' && editedPhone)) && (
            <Modal
              title={
                openModal === 'removePhone'
                  ? 'Видалити номер'
                  : openModal === 'phone' && editedPhone
                  ? 'Змінити номер'
                  : 'Додати номер'
              }
              closeModal={handlePhoneModalClose}
              $isOpen={openModal === 'phone'}
            >
              {openModal === 'phone' && (
                <EditPhonesModal
                  phone={editedPhone}
                  closeModal={handlePhoneModalClose}
                />
              )}

              {openModal === 'removePhone' && editedPhone && (
                <RemovePhoneModal
                  phone={editedPhone}
                  closeModal={handlePhoneModalClose}
                />
              )}
            </Modal>
          )}

          {openModal === 'activities' && (
            <Modal
              title="Налаштувати напрямки"
              closeModal={handleModalClose}
              $isOpen={openModal === 'activities'}
            >
              <EditActivitiesModal closeModal={handleModalClose} />
            </Modal>
          )}

          {openModal === 'schedule' && (
            <Modal
              title="Налаштувати графік роботи"
              closeModal={handleModalClose}
              $isOpen={openModal === 'schedule'}
            >
              <SetScheduleModal closeModal={handleModalClose} />
            </Modal>
          )}

          {openModal === 'desc' && (
            <Modal
              title="Змінити опис"
              closeModal={handleModalClose}
              $isOpen={openModal === 'desc'}
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
