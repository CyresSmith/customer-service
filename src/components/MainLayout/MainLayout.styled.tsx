import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 0 ${({ theme }) => theme.space[4]};
  display: grid;
  grid-template-rows: max-content 1fr;
`;

export const MainSection = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
`;