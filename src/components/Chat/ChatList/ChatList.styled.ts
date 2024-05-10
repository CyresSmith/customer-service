import styled from 'styled-components';
import theme from 'utils/theme';

export const ListBox = styled.div`
    display: flex;
    gap: ${theme.space[3]};
    flex-grow: 1;
`;

export const List = styled.ul`
    flex-grow: 1;
    overflow-y: scroll;
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.s};
    padding: ${theme.space[4]};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};

    > li {
        display: flex;
        flex-direction: column;
        gap: ${theme.space[4]};
        transition: ${theme.transition.primary};

        /* &:not(:last-child) {
            &:after {
                content: '';
                height: 1px;
                width: 100%;
                display: block;
                background-color: aliceblue;
            }
        } */
    }
`;

export const CompanyItem = styled.button<{ $isSelected: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    color: ${theme.colors.white};
    transition: ${theme.transition.primary};

    > p {
        color: ${({ $isSelected }) =>
            $isSelected ? theme.colors.accent.light : theme.colors.white};
        transition: ${theme.transition.primary};
    }

    &:hover {
        > p {
            color: ${({ $isSelected }) =>
                $isSelected ? theme.colors.accent.main : theme.colors.secondary.main};
        }
    }
`;
