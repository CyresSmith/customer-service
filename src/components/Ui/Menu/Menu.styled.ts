import styled from 'styled-components';
import theme from 'utils/theme';
import { MenuSize } from './Menu';

export type Size = {
  $menuSize: MenuSize;
};

export const MenuList = styled.ul<Size>`
  width: 100%;
  min-width: 150px;
  font-size: ${({ $menuSize }) =>
    $menuSize === 'l' ? theme.fontSizes.xl : theme.fontSizes.l};
`;
