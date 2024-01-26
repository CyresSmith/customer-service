import styled from 'styled-components';
import theme from 'utils/theme';

export const Form = styled.form`
  display: flex;
  width: 25vw;
  flex-direction: column;
  gap: ${theme.space[6]};
  justify-content: center;
`;

export const FormInputsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
  justify-content: center;
`;

export const FormInputsListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.space[1]};
`;

export const FormInputLabel = styled.label`
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const FormInputBox = styled.div`
  position: relative;
`;

export const HideButton = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: ${theme.space[3]};
  top: 50%;
  transform: translateY(-50%);
`;

export const HideIcon = styled.svg<{ hidden: boolean }>`
  width: 20px;
  height: 20px;
  transition: ${theme.transition.primary};
  fill: ${({ hidden }) =>
    hidden ? theme.colors.secondary.main : theme.colors.secondary.dark};
`;

export const FormInput = styled.input<{$invalid?: string}>`
  color: ${theme.colors.bg.dark};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.radii.s};
  background-color: ${theme.colors.secondary.light};
  border: ${theme.borders.normal} ${props => props.$invalid ? theme.colors.danger : theme.colors.bg.main};
  transition: ${theme.transition.primary};
  font-size: ${theme.fontSizes.l};
  width: 100%;

  &:focus {
    border-color: ${props => props.$invalid ? theme.colors.danger : theme.colors.primary.light};
  }
`;

export const ValidationError = styled.span`
  position: absolute;
  bottom: -35%;
  right: 0;
  color: ${({ theme }) => theme.colors.danger};
`;
