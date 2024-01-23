import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[4]};
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: ${({ theme }) => theme.space[3]};
`;

export const OutletWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${({ theme }) => theme.colors.componentsBg};
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.m};
  box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
  -webkit-box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
  -moz-box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37); */
`