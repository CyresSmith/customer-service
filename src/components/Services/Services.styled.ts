import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

export const ItemBox = styled.li`
  cursor: pointer;
  padding: ${theme.space[4]};
  transition: ${theme.transition.primary};
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.s};

  &:not(:last-of-type) {
    margin-bottom: ${theme.space[4]};
  }

  &:hover {
    background-color: ${theme.colors.bg.light};
  }
`;

export const Name = styled.p`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
`;
