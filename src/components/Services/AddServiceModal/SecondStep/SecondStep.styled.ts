import styled from 'styled-components';
import theme from 'utils/theme';

const EMPLOYEE_HIGHT = 62;

export const EmployeesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[0]};
  max-height: calc((${EMPLOYEE_HIGHT}px * 5) + (${theme.space[0]} * 4));
  overflow-x: hidden;
`;

const IMAGE_SIZE = 50;

export const Employee = styled.button<{ $selected: boolean }>`
  display: flex;
  gap: ${theme.space[4]};
  align-items: center;
  color: ${theme.colors.white};
  width: 100%;
  padding: ${theme.space[2]};
  border-radius: ${theme.radii.s};
  transition: ${theme.transition.primary};
  height: ${EMPLOYEE_HIGHT}px;

  &:hover {
    background-color: ${theme.colors.bg.light};

    > svg {
      fill: ${theme.colors.accent.main};
    }
  }

  > svg {
    fill: ${theme.colors.accent.light};
    transition: ${theme.transition.primary};
    transform: ${({ $selected }) =>
      $selected ? 'translateX(0)' : 'translateX(150%)'};
  }
`;

export const EmployeeImg = styled.div`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: ${theme.radii.round};
  overflow: hidden;
  position: relative;
  background-color: ${theme.colors.secondary.main};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > svg {
    fill: ${theme.colors.secondary.dark};
  }
`;

export const CHECK_SIZE = 30;

export const Name = styled.p`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.light};
  width: calc(
    100% - ${IMAGE_SIZE}px - (${theme.space[4]} * 2) - ${CHECK_SIZE}px
  );
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
