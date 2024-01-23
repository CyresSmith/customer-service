import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';

export const NavWrapper = styled.div`
  font-size: ${theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.space[3]};
  margin-left: ${theme.space[6]};
`;

export const UsersOptions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.space[3]};
`;

export const UsersEmail = styled.p`
  color: ${theme.colors.primary.light};
`;

export const UsersAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.bg.main};
  position: relative;
  height: 40px;
  width: 40px;
  background-color: ${theme.colors.primary.main};
  border-radius: ${theme.radii.round};
`;

export const UsersAvatar = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const UsersNoAvatar = styled.span`
  font-size: ${theme.fontSizes.xxl};
  text-transform: uppercase;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
`;

export const NavListItem = styled.li``;

export const NavListItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${theme.space[3]};
  color: ${theme.colors.primary.light};
  transition: ${theme.transition.primary};

  &:hover {
    color: ${theme.colors.accent.main};
  }
  &:focus-visible {
    color: ${theme.colors.accent.main};
  }
`;

export const StyledIcon = styled.svg`
  width: 25px;
  height: 25px;
  fill: ${theme.colors.primary.light};
  transition: inherit;

  ${NavListItemLink}:hover & {
    fill: ${theme.colors.accent.main};
  }

  ${NavListItemLink}:focus-visible & {
    fill: ${theme.colors.accent.main};
  }
`;
