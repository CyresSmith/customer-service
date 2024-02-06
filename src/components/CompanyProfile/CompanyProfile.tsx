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
  HiPhone,
} from 'react-icons/hi';
import { useOutletContext } from 'react-router-dom';
import AddPhoneModal from './AddPhoneModal';
import CompanyLogo from './CompanyLogo';
import {
  Address,
  ButtonBox,
  Info,
  InfoBlock,
  InfoList,
  Name,
  StyledIcon,
  Title,
  TitleBox,
  Wrapper,
} from './CompanyProfile.styled';
import SetScheduleModal from './SetScheduleModal';

const CompanyProfile = () => {
  const { name, avatar, address, phones, activities, id, workingHours } =
    useCompany();

  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleSetWorkTimeModalClose = () => {
    refetchCompanyData();
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
                      <p>{phone}</p>
                    </li>
                  ))}
                </InfoList>

                <ButtonBox>
                  <Button size="s" onClick={() => setOpenModal('phone')}>
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
                  <Button size="s" onClick={() => setOpenModal('schedule')}>
                    Налаштувати графік
                  </Button>
                </ButtonBox>
              </InfoBlock>
            </Info>
          </Wrapper>

          {openModal === 'phone' && (
            <Modal
              closeModal={() => setOpenModal(null)}
              $isOpen={openModal === 'phone'}
            >
              <AddPhoneModal closeModal={() => setOpenModal(null)} />
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
