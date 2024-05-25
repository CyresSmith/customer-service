import styled from 'styled-components';
import theme from 'utils/theme';
import { Selected } from '../CreateCompanyForm.types';

export const CategoriesList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: ${theme.space[3]};
`;

export const Category = styled.li<Selected>`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.bold};
    padding: ${theme.space[2]} ${theme.space[3]};
    color: ${theme.colors.bg.dark};
    background-color: ${({ selected }) =>
        selected ? theme.colors.accent.light : theme.colors.secondary.light};
    border-radius: ${theme.radii.m};
    cursor: pointer;
    transition: ${theme.transition.primary};

    &:hover {
        background-color: ${({ selected }) =>
            selected ? theme.colors.accent.main : theme.colors.primary.main};
    }
`;
