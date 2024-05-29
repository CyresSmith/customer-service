import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div``;

export const Skeleton = styled.div`
    height: 350px;
    width: 800px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ClientName = styled.p`
    font-size: ${theme.fontSizes.heading.xs};
    margin-bottom: ${theme.space[3]};
`;

export const SidesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    gap: ${theme.space[5]};

    @media ${theme.breakpoints.tablet.media} {
        grid-template-columns: max-content 1fr;
        grid-template-rows: 1fr;
    }

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: max-content 1fr;
        grid-template-rows: 1fr;
    }
`;

export const LeftSideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${theme.breakpoints.tablet.media} {
        justify-content: space-between;
        align-items: start;
    }

    @media ${theme.breakpoints.desktop.media} {
        justify-content: space-between;
        align-items: start;
    }
`;

export const BtnWrapper = styled.div`
    width: fit-content;
`;

export const Bar = styled.div`
    display: flex;
    gap: ${theme.space[4]};
    padding: ${theme.space[3]} 0;
    border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
    margin-bottom: ${theme.space[4]};
`;
