import styled from 'styled-components';
import theme from 'utils/theme';
import { LAYOUT_GAP, LAYOUT_PADDING } from '../MainLayout/MainLayout.styled';

export const MainSection = styled.section`
    position: relative;
    width: 100%;
    height: 100%;

    @media ${theme.breakpoints.desktop.media} {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: ${LAYOUT_GAP};
    }
`;

export const OutletWrapper = styled.div`
    background-color: ${theme.colors.bg.dark};
    padding: ${LAYOUT_PADDING};
    border-radius: ${theme.radii.l};
    box-shadow: ${theme.shadow.m};
    overflow: hidden;
    width: 100%;
    height: 100%;
`;
