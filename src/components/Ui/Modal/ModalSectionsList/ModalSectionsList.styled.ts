import styled from 'styled-components';
import theme from 'utils/theme';

export const SectionsButtonList = styled.ul`
    display: flex;
    gap: ${theme.space[1]};
    padding: ${theme.space[3]};
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.l};
    box-shadow: ${theme.shadow.s};
`;
