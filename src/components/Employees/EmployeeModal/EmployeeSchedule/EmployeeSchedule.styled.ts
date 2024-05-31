import styled from 'styled-components';
import theme from 'utils/theme';

export const Message = styled.p`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.light};
    text-align: center;
`;

export const EditScheduleButtonsBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const CalendarSide = styled.div`
    width: 100%;
    position: relative;

    @media ${theme.breakpoints.desktop.media} {
        min-width: 710px;
    }
`;

export const SelectionSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 534px;
    width: 300px;
    gap: ${theme.space[5]};
`;

export const SelectionBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[5]};
`;

export const ButtonsBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ScheduleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
`;

export const Title = styled.p`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.bold};
`;

export const SelectDaysBox = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.space[3]};

    > li {
        > button {
            width: 100%;
        }
    }
`;

export const CompanyScheduleList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};

    > li > p {
        display: flex;
        flex-direction: column;
        gap: ${theme.space[0]};
    }
`;

export const SelectBox = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: ${theme.space[2]};
`;

export const CalendarHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    margin-bottom: ${theme.space[4]};

    @media ${theme.breakpoints.tablet.media} {
        flex-direction: row;
        justify-content: space-between;
    }

    @media ${theme.breakpoints.desktop.media} {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const MonthBox = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[4]};
`;

export const MonthName = styled.p`
    width: 130px;
    text-align: center;
    font-size: ${theme.fontSizes.l};
`;
