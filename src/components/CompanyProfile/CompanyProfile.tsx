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
import CompanyLogo from './CompanyLogo';
import {
  Address,
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
import Button from 'components/Ui/Buttons/Button';

const CompanyProfile = () => {
  const { name, avatar, address, phones, activities, id, workingHours } =
    useCompany();

  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const [isSetWorkTimeModalOpen, setIsSetWorkTimeModalOpen] = useState(false);

  // useEffect(() => {
  //   if (name && !workingHours && !isSetWorkTimeModalOpen) {
  //     setIsSetWorkTimeModalOpen(true);
  //   }
  // }, [isSetWorkTimeModalOpen, name, workingHours]);

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

                <Button onClick={() => setIsSetWorkTimeModalOpen(true)}>
                  Налаштувати графік
                </Button>
              </InfoBlock>
            </Info>
          </Wrapper>

          {isSetWorkTimeModalOpen && (
            <Modal
              closeModal={() => setIsSetWorkTimeModalOpen(false)}
              $isOpen={isSetWorkTimeModalOpen}
            >
              <SetScheduleModal
                closeModal={() => {
                  setIsSetWorkTimeModalOpen(false);
                  refetchCompanyData();
                }}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default CompanyProfile;
