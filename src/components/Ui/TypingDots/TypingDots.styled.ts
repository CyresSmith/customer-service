import styled from 'styled-components';
import theme from 'utils/theme';

export const TypingDotsBox = styled.span<{ size: number }>`
    display: flex;
    height: ${({ size }) => size + 'px'};
    width: ${({ size }) => size * 3 + (size / 2) * 3 + 'px'};
    gap: ${({ size }) => size / 2 + 'px'};

    > span {
        display: block;
        width: ${({ size }) => size + 'px'};
        height: ${({ size }) => size + 'px'};
        background: ${theme.colors.accent.main};
        border-radius: 50%;
        animation: bump 1s ease infinite;

        &:first-child {
            animation-delay: 0;
        }
        &:nth-child(2) {
            animation-delay: 0.11s;
        }
        &:last-child {
            animation-delay: 0.22s;
        }
    }

    @keyframes bump {
        0% {
            transform: translateY(0%);
        }
        33% {
            transform: translateY(-100%);
        }
        66% {
            transform: translateY(0%);
        }
    }
`;
