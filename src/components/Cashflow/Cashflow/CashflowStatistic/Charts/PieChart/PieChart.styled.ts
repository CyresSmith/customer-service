import styled from 'styled-components';
import theme from 'utils/theme';

export const PieChartBox = styled.div<{ width: number }>`
    width: ${({ width }) => `${width}px`};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
`;

export const ChartTitle = styled.h6`
    font-size: ${theme.fontSizes.xl};
    text-align: center;
`;

export const PieBox = styled.div`
    position: relative;
`;

export const Total = styled.p`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[1]};
    align-items: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    :nth-child(2) {
        font-size: ${theme.fontSizes.xl};
    }
`;

export const LegendList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
`;

type PieTypeProps = { $isHovered: boolean; $isSomeHovered: boolean };

export const Legend = styled.li<{ color: string } & PieTypeProps>`
    width: 100%;
    display: grid;
    grid-template-columns: 15px repeat(2, 1fr);
    gap: ${theme.space[3]};
    transition: ${theme.transition.primary};
    filter: ${({ $isHovered, $isSomeHovered }) =>
        !$isSomeHovered ? 'saturate(100%)' : $isHovered ? 'saturate(100%)' : 'saturate(50%)'};
    opacity: ${({ $isHovered, $isSomeHovered }) => (!$isSomeHovered ? 1 : $isHovered ? 1 : 0.5)};
    overflow: hidden;

    div {
        display: block;
        width: 100%;
        aspect-ratio: 1/1;
        background-color: ${({ color }) => color};
        border-radius: ${theme.radii.round};
    }

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const StyledG = styled.g<PieTypeProps>`
    transition: ${theme.transition.primary};
    filter: ${({ $isHovered, $isSomeHovered }) =>
        !$isSomeHovered ? 'saturate(100%)' : $isHovered ? 'saturate(100%)' : 'saturate(50%)'};
    opacity: ${({ $isHovered, $isSomeHovered }) => (!$isSomeHovered ? 1 : $isHovered ? 1 : 0.5)};
`;
