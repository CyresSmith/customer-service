import styled from 'styled-components';
import theme from 'utils/theme';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
`;

export const SubTitle = styled.h6`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
  margin-bottom: ${theme.space[3]};
`;
