import Loader from 'components/Ui/Loader';
import translateActivityName from 'helpers/translateActivityName';
import { HiBriefcase, HiOfficeBuilding } from 'react-icons/hi';
import { HiPhone } from 'react-icons/hi2';
import { useGetCompanyProfileQuery } from 'services/company.api';
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
type Props = {
  companyId: string;
};

const CompanyProfile = ({ companyId }: Props) => {
  const { isLoading, isSuccess, isError, error, data } =
    useGetCompanyProfileQuery(companyId, { refetchOnMountOrArgChange: true });

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && data && (
        <Wrapper>
          <CompanyLogo name={data.name} avatar={data.avatar} />

          <Info>
            <InfoBlock>
              <p>Компанія</p>
              <Name>{data.name}</Name>
            </InfoBlock>

            <InfoBlock>
              <TitleBox>
                <StyledIcon as={HiOfficeBuilding} />
                <Title>Адреса:</Title>
              </TitleBox>

              <Address>{data.address}</Address>
            </InfoBlock>

            <InfoBlock>
              <TitleBox>
                <StyledIcon as={HiPhone} />
                <Title>Телефони:</Title>
              </TitleBox>

              <InfoList>
                {data.phones.map((phone: string, i) => (
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
                {data.activities.map(({ id, name }) => (
                  <li key={id}>
                    <p>{translateActivityName(name)}</p>
                  </li>
                ))}
              </InfoList>
            </InfoBlock>
          </Info>
        </Wrapper>
      )}
    </>
  );
};

export default CompanyProfile;
