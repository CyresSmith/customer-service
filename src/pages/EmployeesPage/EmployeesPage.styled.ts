import styled from 'styled-components';
import theme from 'utils/theme';

export const PageBar = styled.div`
  width: 100%;
  min-height: 30px;
  border-bottom: ${theme.borders.normal} ${theme.colors.bg.main};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.space[4]};
  padding-bottom: ${theme.space[3]};
`;

export const PageLayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
`;
