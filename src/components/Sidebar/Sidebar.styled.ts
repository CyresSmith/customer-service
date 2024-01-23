import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.aside`
  background-color: ${theme.colors.bg.main};
  padding: ${theme.space[4]};
  border-radius: ${theme.radii.m};
  box-shadow: ${theme.shadow.m};
`;
