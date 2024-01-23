import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space[5]};
    justify-content: center;
`

export const FormInputsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space[3]};
    justify-content: center;
`

export const FormInputsListItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space[1]};
`

export const FormInputLabel = styled.label`

    &::first-letter {
        text-transform: capitalize;
    }
`

export const FormInput = styled.input`
    color: ${({ theme }) => theme.colors.componentsBg};
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
    border-radius: ${({ theme }) => theme.radii.s};
    background-color: ${({ theme }) => theme.colors.linkText};
    border: ${({ theme }) => theme.borders.normal} ${({ theme }) => theme.colors.componentsBg};
    transition: ${({ theme }) => theme.transition.primary};

    &:focus {
        border-color: ${({ theme }) => theme.colors.accent};
    }
`