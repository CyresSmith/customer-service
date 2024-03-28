import styled from 'styled-components';
import theme from 'utils/theme';

type ListProps = { $daysCount: number };

const firstCellWidth = '100px';
const cellSize = '60px';

export const ScheduleBox = styled.div`
  display: grid;
  grid-template-columns: ${firstCellWidth} calc(100% - ${firstCellWidth});
`;

export const EmployeesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const MonthDaysBox = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

export const Month = styled.ul<ListProps>`
  display: grid;
  grid-template-columns: ${({ $daysCount }) =>
    `repeat(${$daysCount}, ${cellSize})`};
`;

export const FirstCell = styled.div`
  height: ${cellSize};
  border: ${theme.borders.normal} ${theme.colors.bg.main};
`;

export const HeaderDayBox = styled.div`
  height: ${cellSize};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${theme.borders.normal} ${theme.colors.bg.main};
`;

export const DayBox = styled.div`
  height: ${cellSize};
  border: ${theme.borders.normal} ${theme.colors.bg.main};
`;
