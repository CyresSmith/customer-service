import styled from 'styled-components';
import theme from 'utils/theme';

export const PageBar = styled.div`
  width: 100%;
  border-bottom: ${theme.borders.normal} ${theme.colors.bg.main};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: ${theme.space[4]};
  padding-bottom: ${theme.space[4]};
  flex-wrap: wrap;
`;

export const PageLayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
  height: 100%;
`;
