import styled from 'styled-components';
import theme from 'utils/theme';

export const ModalHeaderBox = styled.div`
  width: 100%;
  margin-bottom: ${theme.space[4]};
  display: flex;
  gap: ${theme.space[4]};
  align-items: center;
`;

export const AvatarBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.radii.round};
  overflow: hidden;
  background-color: ${theme.colors.bg.light};
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 35px;
    height: 35px;
    fill: ${theme.colors.secondary.light};
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[1]};
`;

export const Title = styled.h5`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`;

export const SubTitle = styled.p`
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.light};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
  color: ${theme.colors.secondary.light};
`;
