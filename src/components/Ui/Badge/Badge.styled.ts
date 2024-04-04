import styled from 'styled-components';
import theme from 'utils/theme';

export const BadgeBox = styled.div`
    border-radius: ${theme.radii.round};
    color: ${theme.colors.bg.dark};
    background-color: ${theme.colors.accent.main};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.fontSizes.m};
    font-weight: ${theme.fontWeights.bold};
    position: absolute;
    top: -${theme.space[3]};
    left: -${theme.space[3]};
    box-shadow: ${theme.shadow.m};
    width: 20px;
    height: 20px;
`;
