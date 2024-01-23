import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
  color: ${theme.colors.text.main};
  font-size: ${theme.fontSizes.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.space[2]};
`;

export const ListItem = styled.li``;

export const ListItemLink = styled(NavLink)`
  padding: ${theme.space[3]} ${theme.space[4]};
  display: flex;
  align-items: center;
  gap: ${theme.space[3]};
  border-radius: ${theme.radii.s};
  transition: ${theme.transition.primary};

  &:hover,
  :focus {
    background-color: ${theme.colors.accent.main};
    color: ${theme.colors.bg.main};
  }
`;

export const StyledIcon = styled.svg`
  width: 25px;
  height: 25px;
  transition: ${theme.transition.primary};

  ${ListItemLink}:hover & {
    fill: ${theme.colors.bg.main};
  }
`;
