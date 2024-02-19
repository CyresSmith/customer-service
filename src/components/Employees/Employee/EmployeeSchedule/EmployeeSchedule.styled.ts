import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeScheduleBox = styled.div`
  display: grid;
  grid-template-columns: 250px 550px;
  gap: ${theme.space[5]};
  align-items: start;
`;
