import styled from 'styled-components';
import theme from 'utils/theme';

export const EventWrapper = styled.div<{ $top: number; $height: number }>`
    position: absolute;
    z-index: 5;
    top: calc(${({ $top }) => $top} * ${theme.timeStep}px + 1px);
    height: ${({ $height }) => $height * 2}px;
    width: 100%;
    padding: ${theme.space[1]};
`;

export const Event = styled.div`
    width: 100%;
    height: 100%;
    border-radius: ${theme.radii.s};
    background-color: ${theme.colors.primary.rgba};
`;
