import styled from 'styled-components';
import theme from 'utils/theme';

export const DayList = styled.ul`
    display: flex;
    justify-content: space-between;
    gap: ${theme.space[1]};

    @media ${theme.breakpoints.tablet.media} {
        gap: ${theme.space[2]};
    }

    @media ${theme.breakpoints.desktop.media} {
        gap: ${theme.space[3]};
    }
`;

export const WeekBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};

    @media ${theme.breakpoints.desktop.media} {
        flex-direction: row;
        gap: ${theme.space[5]};
    }
`;

export const TimeWithButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${theme.space[4]};
`;

export const TimeBox = styled.div`
    display: flex;
    gap: ${theme.space[3]};
    justify-content: space-between;
`;

export const Time = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.secondary.light};
`;
