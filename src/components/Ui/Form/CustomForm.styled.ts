import styled from 'styled-components';
import theme from 'utils/theme';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
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
  color: ${theme.colors.bg.main};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.radii.s};
  background-color: ${theme.colors.primary.main};
  border: ${theme.borders.normal} ${theme.colors.bg.main};
  transition: ${theme.transition.primary};

  &:focus {
    border-color: ${theme.colors.accent};
  }
`;
