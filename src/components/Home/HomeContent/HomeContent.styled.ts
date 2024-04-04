import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    padding: ${theme.space[4]};
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.s};
    height: 100%;
    box-shadow: ${theme.shadow.m};
`;
