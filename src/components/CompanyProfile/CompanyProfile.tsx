import Button from 'components/Ui/Buttons/Button';
import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import translateActivityName from 'helpers/translateActivityName';
import translateWorkSchedule from 'helpers/translateWorkSchedule';
import { useCompany } from 'hooks/useCompany';
import { useState } from 'react';
import {
  HiBriefcase,
  HiCalendar,
  HiOfficeBuilding,
  HiPencil,
  HiPencilAlt,
  HiPhone,
  HiPlus,
  HiX,
} from 'react-icons/hi';
import { useOutletContext } from 'react-router-dom';
import EditPhonesModal from './AddPhoneModal';
import CompanyLogo from './CompanyLogo';
import {
  Address,
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
import RemovePhone from './RemovePhone';
import SetScheduleModal from './SetScheduleModal';

const CompanyProfile = () => {
  const { name, avatar, address, phones, activities, id, workingHours } =
    useCompany();

  const [editedPhone, setEditedPhone] = useState<string | null>(null);

  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleSetWorkTimeModalClose = () => {
    refetchCompanyData();
    setOpenModal(null);
  };

  const handlePhoneModalClose = () => {
    setEditedPhone(null);
    setOpenModal(null);
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

                <Address>{address}</Address>
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

                {/* <ButtonBox>
                  <Button
                    size="s"
                    onClick={() => setIsSetWorkTimeModalOpen(true)}
                  >
                    Налаштувати напрямки діяльності
                  </Button>
                </ButtonBox> */}
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
                    Icon={HiPencilAlt}
                    size="s"
                    $colors="light"
                    onClick={() => setOpenModal('schedule')}
                  >
                    Налаштувати графік
                  </Button>
                </ButtonBox>
              </InfoBlock>
            </Info>
          </Wrapper>

          {(openModal === 'phone' ||
            (openModal === 'removePhone' && editedPhone)) && (
            <Modal
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
                <RemovePhone
                  phone={editedPhone}
                  closeModal={handlePhoneModalClose}
                />
              )}
            </Modal>
          )}

          {openModal === 'schedule' && (
            <Modal
              closeModal={handleSetWorkTimeModalClose}
              $isOpen={openModal === 'schedule'}
            >
              <SetScheduleModal closeModal={handleSetWorkTimeModalClose} />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default CompanyProfile;
