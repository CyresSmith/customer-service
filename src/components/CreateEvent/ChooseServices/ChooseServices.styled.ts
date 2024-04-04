import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.space[4]};
  padding: ${theme.space[3]} ${theme.space[0]};
  border-bottom: ${theme.borders.normal} ${theme.colors.white};
  margin-bottom: ${theme.space[4]};
`;

export const SearchBox = styled.div`
  width: calc(100% - 200px);
`;

export const ScrollWrapper = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  overflow: auto;
`;
