import styled from 'styled-components';
import theme from 'utils/theme';

export const CalendarBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: ${theme.space[2]};
`;

interface ICalendarDay {
    $today?: boolean;
    $selected?: boolean;
    $isDisabled?: boolean;
}

export const WeekDay = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space[0]};
    text-transform: capitalize;
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.regular};
`;

export const Hours = styled.span`
    font-size: ${theme.fontSizes.s};
    font-weight: ${theme.fontWeights.light};
    color: ${theme.colors.secondary.light};
`;

export const Day = styled.div<ICalendarDay>`
    background-color: ${({ $today, $selected }) =>
        $selected
            ? theme.colors.secondary.light
            : $today
              ? theme.colors.accent.main
              : theme.colors.bg.light};
    color: ${({ $today, $selected }) =>
        $selected ? theme.colors.bg.main : $today ? theme.colors.bg.dark : theme.colors.white};
    border-radius: ${theme.radii.s};
    padding: ${theme.space[2]};
    height: 73px;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    transition: ${theme.transition.primary};
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};

    &:hover {
        background-color: ${({ $today, $selected }) =>
            $selected
                ? theme.colors.secondary.light
                : $today
                  ? theme.colors.accent.light
                  : theme.colors.secondary.main};
    }

    &.other {
        opacity: 0.6;
    }
`;

export const DayDate = styled.p<ICalendarDay>`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${({ $today }) => ($today ? theme.fontWeights.bold : theme.fontWeights.regular)};

    padding-bottom: ${theme.space[1]};
    margin-bottom: ${theme.space[1]};

    border-bottom: ${theme.borders.normal};
    text-align: center;
`;

export const DaySchedule = styled.p`
    font-size: ${theme.fontSizes.s};
    font-weight: ${theme.fontWeights.regular};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[0]};
`;

export const Break = styled.span`
    font-size: ${theme.fontSizes.xs};
`;
