import styled from 'styled-components';

export const BarWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]};
  border: ${({ theme }) => theme.borders.normal} #fff;
`;