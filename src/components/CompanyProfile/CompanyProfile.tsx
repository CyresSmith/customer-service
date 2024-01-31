import translateActivityName from 'helpers/translateActivityName';
import { useCompany } from 'hooks/useCompany';
import { HiBriefcase, HiOfficeBuilding } from 'react-icons/hi';
import { HiPhone } from 'react-icons/hi2';
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

const CompanyProfile = () => {
  const { name, avatar, address, phones, activities, id } = useCompany();

  return (
    <>
      <Wrapper>
        <CompanyLogo name={name} avatar={avatar} companyId={id} />

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
        </Info>
      </Wrapper>
    </>
  );
};

export default CompanyProfile;
