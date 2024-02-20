import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeScheduleBox = styled.div`
  display: grid;
  grid-template-columns: 250px 550px;
  gap: ${theme.space[5]};
  align-items: start;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[4]};
  margin-bottom: ${theme.space[4]};
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
