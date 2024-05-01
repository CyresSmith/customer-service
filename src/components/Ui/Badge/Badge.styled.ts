import styled from 'styled-components';
import theme from 'utils/theme';

export const BadgeWrapper = styled.div`
    position: relative;
`;

export type BadgeStyle = 'accent' | 'danger' | 'success';

export const BadgeBox = styled.div<{ $style: BadgeStyle }>`
    border-radius: ${theme.radii.round};
    color: ${theme.colors.bg.dark};
    background-color: ${({ $style }) => theme.colors[$style].main};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.fontSizes.m};
    font-weight: ${theme.fontWeights.bold};
    position: absolute;
    top: -${theme.space[1]};
    right: -${theme.space[1]};
    box-shadow: ${theme.shadow.m};
    width: 20px;
    height: 20px;
`;
