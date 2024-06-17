import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: ${theme.space[4]};

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
    display: grid;
    grid-template-columns: repeat(2, max-content);
    align-items: end;
    gap: ${theme.space[4]};

    @media ${theme.breakpoints.mobile.media} {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
`;

export const RightWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    @media ${theme.breakpoints.tablet.media} {
        align-items: end;
        gap: ${theme.space[4]};
    }

    @media ${theme.breakpoints.desktop.media} {
        align-items: end;
        gap: ${theme.space[4]};
    }
`;
