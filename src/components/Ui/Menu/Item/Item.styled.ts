import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';

type IsItemOpen = {
  $isOpen: boolean;
};

export const ItemBox = styled.li<IsItemOpen>`
  > button {
    color: ${({ $isOpen }) =>
      $isOpen ? theme.colors.primary.light : theme.colors.secondary.light};
  }

  > svg {
    color: ${({ $isOpen }) =>
      $isOpen ? theme.colors.primary.light : theme.colors.secondary.light};
  }

  &:not(:last-of-type) {
    margin-bottom: ${theme.space[3]};
  }
`;

export const ItemChevron = styled.svg<IsItemOpen>`
  width: 20px;
  height: 20px;
  margin-left: auto;
  fill: ${({ $isOpen }) =>
    $isOpen ? theme.colors.primary.light : theme.colors.secondary.light};
  transition: ${theme.transition.primary};
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
`;

export const ItemLink = styled(NavLink)`
  width: 100%;
  display: flex;
  color: ${theme.colors.secondary.light};
  align-items: center;
  transition: ${theme.transition.primary};
  padding: ${theme.space[0]} ${theme.space[3]};
  border-radius: ${theme.radii.xs};

  &:hover {
    color: ${theme.colors.bg.main};
    background-color: ${theme.colors.secondary.main};
  }

  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-width: calc(100% - 20px);
  }
`;

export const ChildrenBox = styled.li<IsItemOpen>`
  max-height: ${({ $isOpen }) => ($isOpen ? '50vh' : 0)};
  margin-bottom: ${({ $isOpen }) => ($isOpen ? theme.space[3] : 0)};
  padding-bottom: ${({ $isOpen }) => ($isOpen ? theme.space[3] : 0)};
  overflow: hidden;
  transition: ${theme.transition.primary};
  position: relative;

  :after {
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${theme.colors.primary.light};
  }
`;
