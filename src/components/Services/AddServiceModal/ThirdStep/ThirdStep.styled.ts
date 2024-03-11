import styled from 'styled-components';
import theme from 'utils/theme';

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
`;

export const EmployeesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SettingsBlockBox = styled.li`
  display: grid;
  grid-template-columns: 200px 80px repeat(2, 120px);
  gap: ${theme.space[4]};
  align-items: center;
  padding-bottom: ${theme.space[3]};
  border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
`;

export const Employee = styled.div`
  display: flex;
  gap: ${theme.space[4]};
  align-items: center;
`;

export const GeneralSettings = styled.p`
  height: 50px;
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
  display: flex;
  align-items: center;
`;

export const Parameter = styled.li`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.light};
`;

export const CheckboxBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
  margin-top: ${theme.space[6]};

  > li {
    display: grid;
    grid-template-columns: 200px 120px;
    min-height: 34px;
    align-items: center;
    gap: ${theme.space[4]};
  }
`;
