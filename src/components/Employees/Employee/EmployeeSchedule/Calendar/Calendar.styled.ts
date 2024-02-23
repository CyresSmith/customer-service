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
}

export const WeekDay = styled.span`
  text-align: center;
  text-transform: capitalize;
`;

export const Day = styled.div<ICalendarDay>`
  background-color: ${({ $today, $selected }) =>
    $selected
      ? theme.colors.secondary.light
      : $today
      ? theme.colors.accent.main
      : theme.colors.bg.light};
  color: ${({ $today, $selected }) =>
    $selected
      ? theme.colors.bg.main
      : $today
      ? theme.colors.bg.dark
      : theme.colors.white};
  border-radius: ${theme.radii.s};
  padding: ${theme.space[2]};
  height: 73px;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  cursor: pointer;
  transition: ${theme.transition.primary};

  &:hover {
    background-color: ${({ $today, $selected }) =>
      $selected
        ? theme.colors.secondary.light
        : $today
        ? theme.colors.accent.light
        : theme.colors.secondary.main};
  }

  &.other {
    opacity: 0.4;
  }
`;

export const DayDate = styled.p<ICalendarDay>`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${({ $today }) =>
    $today ? theme.fontWeights.bold : theme.fontWeights.regular};

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
