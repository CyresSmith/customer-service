import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: ${theme.space[5]};

    @media ${theme.breakpoints.tablet.media} {
        display: flex;
        flex-direction: row;
        align-items: end;
        justify-content: space-between;
    }

    @media ${theme.breakpoints.desktop.media} {
        display: flex;
        flex-direction: row;
        align-items: end;
        justify-content: space-between;
    }
`;

export const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.space[5]};
    max-width: 100%;
`;

export const RightWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    @media ${theme.breakpoints.tablet.media} {
        flex-direction: column;
        align-items: end;
        gap: ${theme.space[5]};
    }
`;
