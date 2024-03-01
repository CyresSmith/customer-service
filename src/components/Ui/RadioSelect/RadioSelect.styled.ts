import { SelectedItem } from 'components/TopBar/UsersNav/CreateCompanyForm/CreateCompanyForm.types';
import styled from 'styled-components';
import theme from 'utils/theme';

export const RadioSelectList = styled.ul<{ width?: number }>`
  display: flex;
  gap: ${theme.space[0]};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

export const RadioSelectItem = styled.li<SelectedItem>`
  width: ${({ $itemsCount }) => `calc(100% / ${$itemsCount})`};
  overflow: hidden;

  > button {
    display: block;
    width: 100%;
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.bold};
    padding: ${theme.space[2]} ${theme.space[3]};
    color: ${theme.colors.bg.dark};
    background-color: ${({ selected }) =>
      selected ? theme.colors.accent.light : theme.colors.secondary.main};
    cursor: pointer;
    transition: ${theme.transition.primary};
    text-align: center;

    &:hover {
      background-color: ${({ selected }) =>
        selected ? theme.colors.accent.main : theme.colors.secondary.light};
    }
  }

  &:first-of-type {
    border-radius: ${theme.radii.s} 0 0 ${theme.radii.s};
  }

  &:last-of-type {
    border-radius: 0 ${theme.radii.s} ${theme.radii.s} 0;
  }
`;
