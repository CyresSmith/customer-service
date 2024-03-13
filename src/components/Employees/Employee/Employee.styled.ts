import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeBox = styled.li`
  cursor: pointer;
  padding: ${theme.space[4]} 0;
  transition: ${theme.transition.primary};
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.s};

  &:not(:last-of-type) {
    margin-bottom: ${theme.space[4]};
  }

  &:hover {
    background-color: ${theme.colors.bg.light};
  }
`;
