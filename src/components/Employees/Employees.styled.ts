import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeesList = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

export const ItemLayout = styled.div`
  display: grid;
  grid-template-columns: 50px 200px 1fr 150px;
  gap: ${theme.space[4]};
  padding: 0 ${theme.space[4]};
  align-items: center;

  :last-child {
    justify-self: end;
  }
`;

export const HeaderItem = styled.p`
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.light};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`;

export const EmployeesCount = styled.div`
  grid-column-start: span 2;
`;
