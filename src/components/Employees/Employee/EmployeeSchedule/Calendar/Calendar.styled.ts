import styled from 'styled-components';
import theme from 'utils/theme';

export const CalendarBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]};
`;

export const Day = styled.div`
  background-color: ${theme.colors.bg.light};
  border-radius: ${theme.radii.s};
  padding: ${theme.space[2]};
  width: calc((100% - (${theme.space[2]} * 6)) / 7);
  height: 73px;
`;

export const OtherMonthDay = styled.div`
  background-color: ${theme.colors.bg.light};
  border-radius: ${theme.radii.s};
  padding: ${theme.space[2]};
  width: calc((100% - (${theme.space[2]} * 6)) / 7);
  height: 73px;
  opacity: 0.4;
`;
