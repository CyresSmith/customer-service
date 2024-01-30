import styled from 'styled-components';
import theme from 'utils/theme';

export const LogoBox = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  object-fit: cover;
  overflow: hidden;
  border-radius: ${theme.radii.xs};
  background-color: ${theme.colors.white};
  cursor: pointer;

  &:hover {
    > svg {
      opacity: 0.8;
    }

    > svg[id='camera'] {
      transform: translate(-50%, -250%);
    }

    > div[id='upload'] {
      transform: translate(-50%, -50%);
    }
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    opacity: 0.5;
    transition: ${theme.transition.primary};
    fill: ${theme.colors.accent.main};
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transition.primary};
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.backdrop};
`;

export const Info = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 75%;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xl};
`;

export const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.space[2]};
  margin-top: ${theme.space[3]};
`;
