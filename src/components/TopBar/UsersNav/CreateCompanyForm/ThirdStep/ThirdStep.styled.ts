import styled from 'styled-components';
import theme from 'utils/theme';
import { SelectedItem } from '../CreateCompanyForm.types';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
`;

export const SubTitle = styled.h6`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
  margin-bottom: ${theme.space[3]};
`;

export const Select = styled.ul`
  display: flex;
  gap: ${theme.space[0]};
  width: 100%;
`;

export const SelectItem = styled.li<SelectedItem>`
  width: ${({ $itemsCount }) => `calc(100% / ${$itemsCount})`};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  padding: ${theme.space[2]} ${theme.space[3]};
  color: ${theme.colors.bg.dark};
  background-color: ${({ selected }) =>
    selected ? theme.colors.accent.light : theme.colors.secondary.light};
  cursor: pointer;
  transition: ${theme.transition.primary};
  text-align: center;

  &:first-of-type {
    border-radius: ${theme.radii.s} 0 0 ${theme.radii.s};
    /* text-align: left; */
  }

  &:last-of-type {
    border-radius: 0 ${theme.radii.s} ${theme.radii.s} 0;
    /* text-align: right; */
  }

  &:hover {
    background-color: ${({ selected }) =>
      selected ? theme.colors.accent.main : theme.colors.primary.main};
  }
`;
