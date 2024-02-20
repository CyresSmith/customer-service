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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${({ $today }) =>
    $today ? theme.fontWeights.bold : theme.fontWeights.light};
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
