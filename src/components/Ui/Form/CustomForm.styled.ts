import styled from 'styled-components';
import theme from 'utils/theme';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[6]};
  justify-content: center;
`;

export const FormInputsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
  justify-content: center;
`;

export const FormInputsListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[1]};
`;

export const FormInputLabel = styled.label`
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const FormInput = styled.input`
  color: ${theme.colors.bg.dark};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.radii.s};
  background-color: ${theme.colors.secondary.light};
  border: ${theme.borders.normal} ${theme.colors.bg.main};
  transition: ${theme.transition.primary};
  font-size: ${theme.fontSizes.l};

  &:focus {
    border-color: ${theme.colors.primary.light};
  }
`;

export const ValidationError = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`