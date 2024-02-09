import styled from 'styled-components';
import theme from 'utils/theme';

interface IIsChecked {
  $isChecked: boolean;
}

export const StyledLabel = styled.label<IIsChecked>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.space[2]};
  cursor: pointer;

  &:hover {
    > svg {
      fill: ${({ $isChecked }) =>
        $isChecked ? theme.colors.accent.main : theme.colors.primary.light};
    }
  }
`;

export const StyledIcon = styled.svg<IIsChecked>`
  width: 25px;
  height: 25px;
  transition: ${theme.transition.primary};
  fill: ${({ $isChecked }) =>
    $isChecked ? theme.colors.accent.light : theme.colors.secondary.light};
`;

export const Name = styled.span`
  font-size: ${theme.fontSizes.m};
  color: ${theme.colors.white};
`;
