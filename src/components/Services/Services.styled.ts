import styled from 'styled-components';
import theme from 'utils/theme';

export const ServiceBarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.space[5]};
  width: 100%;
`;

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[4]};
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ButtonBox = styled.div<{ $hideButton: boolean }>`
  position: absolute;
  top: 50%;
  right: 0;
  height: 33px;
  width: 39px;
  overflow: hidden;
  transform: translateY(-50%);

  > button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: ${({ $hideButton }) =>
      $hideButton ? `translate(100%, -50%)` : ` translate(0, -50%)`};
  }
`;

export const ListHeader = styled.ul`
  display: grid;
  grid-template-columns: 50px repeat(5, 1fr);
  padding: 0 ${theme.space[4]};
  justify-items: center;
  gap: ${theme.space[4]};
`;

export const ListHeaderItem = styled.li`
  &:nth-of-type(2) {
    justify-self: start;
  }

  &:last-of-type {
    justify-self: end;
  }
`;

export const List = styled.ul`
  height: 100%;
  overflow-y: auto;
`;

export const ItemBox = styled.li`
  display: grid;
  grid-template-columns: 50px repeat(5, 1fr);
  cursor: pointer;
  padding: ${theme.space[4]};
  transition: ${theme.transition.primary};
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.s};
  align-items: center;
  gap: ${theme.space[4]};
  animation: ${theme.animation.appear};

  &:not(:last-of-type) {
    margin-bottom: ${theme.space[4]};
  }

  &:hover {
    background-color: ${theme.colors.bg.light};
  }
`;

export const ItemParam = styled.p`
  justify-self: center;

  &:first-of-type {
    justify-self: start;
  }

  &:last-of-type {
    justify-self: end;
  }
`;

export const Name = styled.span`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
`;
