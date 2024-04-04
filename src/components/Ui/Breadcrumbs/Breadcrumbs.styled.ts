import styled from 'styled-components';
import theme from 'utils/theme';

export const BreadcrumbsBox = styled.ul`
    display: flex;
    align-items: center;
    gap: ${theme.space[2]};
    font-size: ${theme.fontSizes.s};
    text-transform: uppercase;
    margin-top: ${theme.space[3]};
    color: ${theme.colors.secondary.light};

    svg {
        width: 15px;
        height: 15px;
    }

    > li {
        display: flex;
        align-items: center;
        gap: ${theme.space[2]};

        > a {
            height: 15px;
            transition: ${theme.transition.primary};

            &:hover {
                color: ${theme.colors.accent.main};
            }
        }
    }
`;
