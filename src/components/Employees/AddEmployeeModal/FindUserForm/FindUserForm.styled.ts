import styled from 'styled-components';
import theme from 'utils/theme';

export const InputWrapper = styled.div`
  position: relative;

  button[id='search'] {
    position: absolute;
    right: 0;
    bottom: calc(33px / 2);
    transform: translateY(50%);
  }
`;

export const UserDataBox = styled.div`
  position: relative;
  min-height: 65px;
  margin: ${theme.space[4]} 0;
`;

export const SearchMessage = styled.p`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.regular};
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

export const UserInfoBox = styled.div`
  display: flex;
  gap: ${theme.space[4]};
`;

export const UserImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.radii.round};
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfo = styled.ul`
  font-size: ${theme.fontSizes.l};
  display: flex;
  flex-direction: column;
  gap: ${theme.space[1]};
`;

export const InfoBlock = styled.li`
  display: flex;
  gap: ${theme.space[3]};
`;

export const Title = styled.span`
  text-transform: capitalize;
  font-weight: ${theme.fontWeights.light};
`;

export const Info = styled.span`
  font-weight: ${theme.fontWeights.bold};
`;
