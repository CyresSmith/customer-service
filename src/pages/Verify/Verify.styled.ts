import styled from 'styled-components';
import theme from 'utils/theme';

export const Message = styled.h1`
  text-align: center;
  margin-top: ${theme.space[8]};
  font-size: ${theme.fontSizes.heading.m};
  font-weight: ${theme.fontWeights.light};
`;
