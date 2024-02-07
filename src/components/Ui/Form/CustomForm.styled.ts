import styled from 'styled-components';
import theme from 'utils/theme';

export const Form = styled.form`
  display: flex;
  width: 100%;
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

export const Required = styled.span`
  font-size: inherit;
  color: ${theme.colors.danger};
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

export const FormInput = styled.input`
  color: ${theme.colors.bg.dark};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.radii.s};
  background-color: ${theme.colors.secondary.light};
  border: ${theme.borders.normal} ${theme.colors.bg.dark};
  transition: ${theme.transition.primary};
  font-size: ${theme.fontSizes.l};
  width: 100%;
  resize: none;

  &:focus {
    border-color: ${theme.colors.accent.main};
    box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
  }
`;

export const ButtonsWrapper = styled.div<{ $direction: string | undefined }>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.$direction};
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  margin: 0 auto;
`;

export const ButtonBox = styled.div<{
  $buttonWidth: string | undefined;
  $second: boolean;
}>`
  width: ${props => props.$buttonWidth};
  margin: ${props => (props.$second ? 0 : '0 auto')};
`;

export const ValidationError = styled.span`
  position: absolute;
  top: calc(100% + ${theme.space[1]});
  right: 0;
  color: ${({ theme }) => theme.colors.danger.light};
`;

export const DoneIcon = styled.svg<{ $complete?: boolean }>`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  fill: ${props =>
    props.$complete ? theme.colors.success.light : theme.colors.danger.light};
`;
