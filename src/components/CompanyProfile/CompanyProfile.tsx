import Loader from 'components/Ui/Loader';
import Modal from 'components/Ui/Modal/Modal';
import translateActivityName from 'helpers/translateActivityName';
import { useCompany } from 'hooks/useCompany';
import { useEffect, useState } from 'react';
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

const CompanyProfile = () => {
  const { name, avatar, address, phones, activities, id, workingHours } =
    useCompany();

  const { refetchCompanyData } = useOutletContext<{
    refetchCompanyData: () => void;
  }>();

  const [isSetWorkTimeModalOpen, setIsSetWorkTimeModalOpen] = useState(false);

  useEffect(() => {
    if (workingHours) return;

    setIsSetWorkTimeModalOpen(true);
  }, [workingHours]);

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

                {
                  <InfoList as="div">
                    {workingHours ? (
                      '<Schedule schedule={workingHours} />'
                    ) : (
                      <div>
                        <p>Рабочій графік не встановлено!</p>
                      </div>
                    )}
                  </InfoList>
                }
              </InfoBlock>
            </Info>
          </Wrapper>

          {isSetWorkTimeModalOpen && (
            <Modal
              closeModal={() => setIsSetWorkTimeModalOpen(false)}
              $isOpen={isSetWorkTimeModalOpen}
            >
              <SetScheduleModal />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default CompanyProfile;
