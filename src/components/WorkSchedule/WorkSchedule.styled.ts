import styled from 'styled-components';
import theme from 'utils/theme';

type ListProps = { $daysCount: number };

const firstCellWidth = '100px';
const cellSize = '75px';

export const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: ${theme.space[3]};
  padding-bottom: ${theme.space[3]};
`;

export const RowBox = styled.div<ListProps>`
  display: flex;
`;

export const Month = styled.ul`
  position: relative;
  left: ${firstCellWidth};
  display: flex;
  z-index: 1;
  gap: ${theme.space[3]};
`;

export const HeaderFirstCell = styled.div`
  height: ${cellSize};
  position: fixed;
  width: ${firstCellWidth};
  height: ${cellSize};
  background-color: ${theme.colors.bg.dark};
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${theme.space[3]};
`;

type DayProps = {
  $isWeekend: boolean;
  $isNotWorking: boolean;
  $isToday: boolean;
};

export const HeaderDayBox = styled.li<DayProps>`
  height: ${cellSize};
  width: ${cellSize};
  display: flex;
  gap: ${theme.space[1]};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ $isWeekend, $isToday }) =>
    $isToday
      ? `${theme.colors.accent.main}`
      : $isWeekend
      ? `${theme.colors.danger.light}`
      : `${theme.colors.white}`};
  font-weight: ${({ $isToday }) =>
    $isToday ? `${theme.fontWeights.bold}` : `${theme.fontWeights.light}`};

  opacity: ${({ $isNotWorking }) => ($isNotWorking ? 0.5 : 1)};
`;

export const FirstCell = styled.div`
  height: ${cellSize};
  position: fixed;
  width: ${firstCellWidth};
  height: ${cellSize};
  background-color: ${theme.colors.bg.dark};
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-right: ${theme.space[3]};
`;

export const EmployeeName = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;

export const DayNumber = styled.span`
  font-size: ${theme.fontSizes.xl};
`;

export const DayName = styled.span`
  font-size: ${theme.fontSizes.s};
`;

export const DayBox = styled.li`
  height: ${cellSize};
  width: ${cellSize};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.s};
  cursor: pointer;
`;
