import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: ${theme.space[4]};
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: ${theme.space[3]};
`;

export const OutletWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 139px);
  /* background-color: ${theme.colors.bg.main};
  padding: ${theme.space[3]} ${theme.space[4]};
  border-radius: ${theme.radii.m};
  box-shadow: ${theme.shadow.m}; */
`;
