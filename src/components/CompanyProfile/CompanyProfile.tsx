import Button from 'components/Ui/Buttons/Button';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import translateActivityName from 'helpers/translateActivityName';
import translateWorkSchedule from 'helpers/translateWorkSchedule';
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
import CompanyLogo from './CompanyLogo';
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
import EditPhonesModal from './EditPhonesModal';
import RemovePhoneModal from './RemovePhoneModal';
import SetScheduleModal from './SetScheduleModal';
import EditDescModal from './EditDescModal';

const CompanyProfile = () => {
  const { name, avatar, address, phones, activities, id, workingHours, desc } =
    useCompany();

  const [editedPhone, setEditedPhone] = useState<string | null>(null);

  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const [openModal, setOpenModal] = useState<string | null>(null);

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
            <CompanyLogo
              name={name}
              avatar={avatar}
              companyId={id}
              refetchCompanyData={refetchCompanyData}
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
                      </FlexBox>
                    </li>
                  ))}
                </InfoList>

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
              </InfoBlock>

              <InfoBlock>
                <TitleBox>
                  <StyledIcon as={HiBookOpen} />
                  <Title>Опис компанії:</Title>
                </TitleBox>

                <InfoList as="div">
                  <FlexBox>
                    <p>{desc ? desc : 'Немає шнформації'}</p>

                    <Button
                      $round
                      $variant="text"
                      size="s"
                      $colors="light"
                      Icon={HiPencil}
                      onClick={() => setOpenModal('desc')}
                    ></Button>
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
