import { HEADER_HIGHT } from 'components/TopBar/TopBar.styled';
import styled from 'styled-components';
import theme from 'utils/theme';

export const LAYOUT_GAP = `${theme.space[3]}`;
export const LAYOUT_PADDING = `${theme.space[4]}`;

export const Container = styled.main`
    width: 100vw;
    height: 100vh;
    padding: ${LAYOUT_PADDING};
    display: grid;
    grid-template-rows: max-content calc(100% - (${LAYOUT_GAP} + ${HEADER_HIGHT}));
    gap: ${LAYOUT_GAP};
`;

export const OutletWrapper = styled.div`
    width: 100%;
    position: relative;
`;
