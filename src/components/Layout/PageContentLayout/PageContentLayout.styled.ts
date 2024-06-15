import styled from 'styled-components';
import theme from 'utils/theme';

export const PageBar = styled.div`
    width: 100%;
    border-bottom: ${theme.borders.normal} ${theme.colors.secondary.main};
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: ${theme.space[4]};
    padding-bottom: ${theme.space[4]};
    flex-wrap: wrap;

    @media ${theme.breakpoints.desktop.media} {
        min-height: 69px;
    }
`;

export const PageLayoutBox = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    gap: ${theme.space[4]};
    height: 100%;
`;
