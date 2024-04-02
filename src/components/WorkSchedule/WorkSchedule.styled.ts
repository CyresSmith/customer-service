import styled from 'styled-components';
import theme from 'utils/theme';

type ListProps = { $daysCount: number };

const firstCellWidth = '100px';
const cellSize = '100px';

export const WorkScheduleBox = styled.section`
  overflow-x: scroll;
  position: relative;
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.m};
  height: 100%;
  width: 100%;
  padding: ${theme.space[3]};
`;

export const SchedulesList = styled.div`
  height: 100%;
`;

export const SchedulesListBox = styled.ul<{ $daysCount: number }>`
  width: ${({ $daysCount }) => `calc((${cellSize} * ${$daysCount}))`};
  max-height: calc(100% - ${cellSize});
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 2;
`;

export const EmployeesList = styled.ul<{ $employeesCount: number }>`
  position: absolute;
  top: -${cellSize};
  background-color: ${theme.colors.bg.main};
  z-index: 3;
  padding-top: ${cellSize};
  height: ${({ $employeesCount }) =>
    `calc(${cellSize} *  ${$employeesCount} + ${cellSize})`};
`;

export const HeaderRowBox = styled.ul<{ $daysCount: number }>`
  display: grid;
  grid-template-columns: ${({ $daysCount }) =>
    `repeat(${$daysCount}, ${cellSize})`};
  grid-template-rows: ${cellSize};
  z-index: 1;
`;

export const RowBox = styled.li<{ $daysCount: number }>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ $daysCount }) =>
    `repeat(${$daysCount}, ${cellSize})`};
  grid-template-rows: ${cellSize};
`;

export const Employee = styled.div`
  width: ${cellSize};
  height: ${cellSize};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
  cursor: pointer;
`;

type DayProps = {
  $isNotWorkingDay?: boolean;
};

export const HeaderDay = styled.li<DayProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
  font-size: ${theme.fontSizes.m};
  padding: ${theme.space[4]} 0;
  font-weight: ${theme.fontWeights.light};
  cursor: ${({ $isNotWorkingDay }) =>
    $isNotWorkingDay ? 'default' : 'pointer'};
`;

export const DayDateBox = styled.div<DayProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ $isNotWorkingDay }) => ($isNotWorkingDay ? 0.5 : 1)};
`;

export const DayDate = styled.span`
  font-size: ${theme.fontSizes.xxl};
`;

export const DayName = styled.span`
  font-size: ${theme.fontSizes.l};
`;

export const WorkHours = styled.div`
  color: ${theme.colors.secondary.main};
`;

export const Day = styled.div<DayProps>`
  border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
  cursor: pointer;
  padding: ${theme.space[2]};
  cursor: ${({ $isNotWorkingDay }) =>
    $isNotWorkingDay ? 'default' : 'pointer'};
`;

export const DayBox = styled.div<{ $selected?: boolean } & DayProps>`
  width: 100%;
  height: 100%;
  border-radius: ${theme.radii.s};
  color: ${({ $selected }) =>
    $selected ? `${theme.colors.bg.dark}` : `${theme.colors.white}`};
  background-color: ${({ $selected }) =>
    $selected ? `${theme.colors.secondary.light}` : 'transparent'};
  transition: ${theme.transition.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.space[2]};
  font-size: ${theme.fontSizes.l};

  &:hover {
    background-color: ${({ $isNotWorkingDay, $selected }) =>
      $isNotWorkingDay
        ? 'transparent'
        : $selected
        ? `${theme.colors.secondary.light}`
        : ` ${theme.colors.secondary.main}`};
  }
`;

export const DayBreak = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.space[1]};
  font-size: ${theme.fontSizes.s};
  color: ${({ $selected }) =>
    $selected ? `${theme.colors.bg.main}` : `${theme.colors.secondary.light}`};
  transition: inherit;
`;
