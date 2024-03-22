import styled from 'styled-components';
import theme from 'utils/theme';

export const ListBar = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: ${theme.space[5]};
  width: 100%;
  margin-bottom: ${theme.space[4]};
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

export const AvatarBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.radii.round};
  overflow: hidden;
  background-color: ${theme.colors.secondary.light};
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 35px;
    height: 35px;
    fill: ${theme.colors.secondary.light};
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > span {
    font-size: 30px;
    font-weight: ${theme.fontWeights.light};
    text-transform: uppercase;
    color: ${theme.colors.bg.main};
  }
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

type ListGridProps = { $columnsCount: number; $isDeleteButton: boolean };

export const ListHeader = styled.ul<ListGridProps>`
  display: grid;
  grid-template-columns: ${({ $columnsCount, $isDeleteButton }) =>
    `repeat(${$columnsCount},   calc((100% - (${
      $isDeleteButton ? '100px' : '50px'
    })) / ${$columnsCount}))`};
  padding: ${({ $isDeleteButton }) =>
    `0 ${theme.space[4]} 0 calc(${$isDeleteButton ? '100px' : '50px'} + (${
      theme.space[4]
    } * 2))`};
  justify-items: center;
  gap: ${theme.space[4]};
  margin-bottom: ${theme.space[2]};
`;

export const ListHeaderItem = styled.li`
  justify-self: center;

  > button {
    padding: ${theme.space[2]} 0;
  }

  &:first-of-type {
    justify-self: start;
  }

  &:last-of-type {
    justify-self: end;
  }
`;

export const List = styled.ul`
  height: calc(100% - 101px);
  overflow-y: auto;
`;

export const ItemBox = styled.li<ListGridProps>`
  display: grid;
  grid-template-columns: ${({ $columnsCount, $isDeleteButton }) =>
    `50px repeat(${$columnsCount},   calc((100% - ((${
      $isDeleteButton ? '100px' : '50px'
    }) + 16px * ${
      $isDeleteButton ? $columnsCount + 1 : $columnsCount
    })) / ${$columnsCount})) ${$isDeleteButton ? '50px' : ''}`};
  cursor: pointer;
  padding: ${theme.space[3]} ${theme.space[4]};
  transition: ${theme.transition.primary};
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.s};
  align-items: center;
  gap: ${theme.space[4]};
  animation: ${theme.animation.appear};
  animation-duration: 500ms;
  transition: ${theme.transition.primary};
  background-color: ${theme.colors.bg.light};

  &:not(:last-of-type) {
    margin-bottom: ${theme.space[3]};
  }

  &:hover {
    background-color: ${theme.colors.secondary.dark};
  }
`;

export const ItemParam = styled.p`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.light};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;

  &:first-letter {
    text-transform: uppercase;
  }

  &:first-of-type {
    text-align: left;
  }

  &:last-of-type {
    text-align: right;
  }
`;

export const Name = styled.span`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
`;
