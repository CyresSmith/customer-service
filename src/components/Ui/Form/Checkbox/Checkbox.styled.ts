import styled from 'styled-components';
import theme from 'utils/theme';

interface IIsChecked {
  $isChecked: boolean;
  $isDisabled: boolean;
}

export const StyledLabel = styled.label<IIsChecked>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.space[2]};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  transition: ${theme.transition.primary};

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
