import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeScheduleBox = styled.div`
  display: grid;
  grid-template-columns: 550px 250px;
  gap: ${theme.space[5]};
  align-items: start;
`;

export const CalendarSide = styled.div`
  width: 100%;
  min-height: 534px;
  position: relative;
`;

export const SelectionSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
    margin-top: ${theme.space[6]};
  }
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
