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

export const MainSection = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: ${theme.space[3]};
`;

export const OutletWrapper = styled.div`
  background-color: ${theme.colors.bg.dark};
  padding: ${theme.space[5]};
  border-radius: ${theme.radii.m};
  box-shadow: ${theme.shadow.m};
  overflow: hidden;
`;
