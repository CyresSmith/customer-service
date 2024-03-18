import styled, { keyframes } from 'styled-components';
import theme from 'utils/theme';

const appeare = keyframes`
    0% { transform: translate(0, 200%); opacity: 0 }
    100% { transform: translate(0, 0); opacity: 1 }
`;

export const List = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ListItem = styled.li`
  width: 100%;
  display: flex;
  gap: ${theme.space[3]};
  align-items: center;
  padding: ${theme.space[3]};
  border-radius: ${theme.radii.s};
  background-color: ${theme.colors.bg.main};
  cursor: pointer;
  animation: ${theme.animation.appear};
  animation-duration: 500ms;
  transition: ${theme.transition.primary};

  &:hover,
  :focus-visible {
    background-color: ${theme.colors.bg.light};
  }
`;

export const AvatarWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.bg.dark};
  border-radius: ${theme.radii.round};
  overflow: hidden;
`;

export const Avatar = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const Name = styled.p`
  font-size: ${theme.fontSizes.l};
`;

export const NoClients = styled.p`
  font-size: ${theme.fontSizes.xxl};
`;
