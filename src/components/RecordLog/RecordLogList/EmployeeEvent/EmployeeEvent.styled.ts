import styled from 'styled-components';
import theme from 'utils/theme';

export const EventWrapper = styled.div<{ $top: number; $height: number }>`
    position: absolute;
    z-index: 5;
    top: calc(${({ $top }) => $top} * ${theme.timeStep}px + 1px);
    height: ${({ $height }) => $height}px;
    width: 100%;
    padding: ${theme.space[1]};
`;

export const Event = styled.div`
    width: 100%;
    height: 100%;
    border-radius: ${theme.radii.s};
    background-color: ${theme.colors.secondary.light};
    padding: ${theme.space[0]} ${theme.space[2]};
    overflow: hidden;
    color: ${theme.colors.bg.dark};
    transition: ${theme.transition.primary};

    &:hover {
        cursor: pointer;
        background-color: ${theme.colors.primary.light};
    }
`;

export const EventTitle = styled.h6`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.bold};
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    position: relative;

    :first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 50%;
        white-space: nowrap;
    }

    &:after {
        content: '';
        display: block;
        height: 1px;
        width: 100%;
        background-color: ${theme.colors.bg.dark};
        position: absolute;
        bottom: -${theme.space[2]};
    }
`;

export const EventInfo = styled.p<{ size?: 'm' | 'l' }>`
    margin-top: ${theme.space[3]};
    font-size: ${({ size = 'm' }) => theme.fontSizes[size]};
    font-weight: ${theme.fontWeights.light};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
`;

export const Info = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;

    b {
        color: ${theme.colors.secondary.light};
    }

    button {
        transition: ${theme.transition.primary};
        color: inherit;

        &:hover {
            color: ${theme.colors.accent.light};
        }
    }
`;
