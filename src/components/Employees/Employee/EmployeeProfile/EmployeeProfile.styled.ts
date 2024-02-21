import styled from 'styled-components';
import theme from 'utils/theme';

export const ProfileBox = styled.div`
  display: grid;
  grid-template-columns: 250px 550px;
  gap: ${theme.space[5]};
  align-items: start;
  min-height: 350px;
`;

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const StatusBadge = styled.div<{ $active: boolean }>`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.bold};
  text-transform: uppercase;
  width: 100px;
  text-align: center;
  padding: ${theme.space[2]};
  border-radius: ${theme.radii.s};
  color: ${theme.colors.bg.main};
  background-color: ${({ $active }) =>
    $active ? theme.colors.success.light : theme.colors.danger.light};
`;

export const Status = styled.ul`
  display: flex;
  gap: ${theme.space[0]};
`;

export const StatusItem = styled.li<{ $active: boolean }>`
  button {
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;
    width: 100px;
    transition: ${theme.transition.primary};
    cursor: pointer;
    text-align: center;
    padding: ${theme.space[2]};
    color: ${theme.colors.bg.main};
    background-color: ${theme.colors.bg.light};
  }

  &:first-of-type {
    > button {
      border-radius: ${theme.radii.s} 0 0 ${theme.radii.s};
      background-color: ${({ $active }) =>
        $active ? theme.colors.success.light : theme.colors.bg.light};

      &:hover {
        background-color: ${theme.colors.success.main};
      }
    }
  }

  &:last-of-type {
    > button {
      border-radius: 0 ${theme.radii.s} ${theme.radii.s} 0;
      background-color: ${({ $active }) =>
        $active ? theme.colors.danger.light : theme.colors.bg.light};

      &:hover {
        background-color: ${theme.colors.danger.main};
      }
    }
  }
`;
