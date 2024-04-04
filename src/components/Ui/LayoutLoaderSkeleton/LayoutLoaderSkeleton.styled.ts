import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
  /* position: fixed;
    top: 0;
    left: 0; */
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.bg.main};
  padding: ${theme.space[4]};
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
`;

export const BarSkeleton = styled.div`
  width: 100%;
  height: 72px;
  background-color: ${theme.colors.bg.dark};
  border-radius: ${theme.radii.m};
`;

export const ContentSkeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.bg.dark};
  border-radius: ${theme.radii.m};
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  pointer-events: none;
  background-color: ${theme.colors.backdrop};
`;
