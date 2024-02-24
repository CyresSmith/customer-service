import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeScheduleBox = styled.div`
  display: flex;
  gap: ${theme.space[5]};
  min-height: 534px;
`;

export const CalendarSide = styled.div`
  width: 650px;
  position: relative;
`;

export const SelectionSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ScheduleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};

  &:not(:first-of-type) {
    margin-top: ${theme.space[5]};
  }
`;

export const Title = styled.p`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.bold};
`;

export const SelectDaysBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.space[3]};

  > li {
    > button {
      width: 100%;
    }
  }
`;

export const CompanyScheduleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};

  > li > p {
    display: flex;
    flex-direction: column;
    gap: ${theme.space[0]};
  }
`;

export const SelectBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: ${theme.space[2]};
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
