import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeModalContent = styled.div`
  min-width: 650px;
`;

export const EmployeeModalHeader = styled.div`
  width: 100%;
  margin-bottom: ${theme.space[4]};
  display: flex;
  gap: ${theme.space[4]};
  align-items: center;
`;

export const SectionsButtonList = styled.ul`
  display: flex;
  gap: ${theme.space[1]};
  margin-bottom: ${theme.space[4]};
  border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
  border-top: ${theme.borders.normal} ${theme.colors.bg.light};
  padding: ${theme.space[3]} 0;
`;
