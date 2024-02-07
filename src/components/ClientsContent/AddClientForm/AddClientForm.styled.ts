import styled from 'styled-components';
import theme from 'utils/theme';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
`

export const FormTitle = styled.h3`
    font-size: ${theme.fontSizes.heading.xs};
`

export const FormSidesWrapper = styled.div`
    display: flex;
    gap: ${theme.space[4]};
`

export const PhotoWrapper = styled.div`
    width: 200px;
    height: 200px;
    background-color: white;
`

export const FormInputsList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: ${theme.space[4]};
`

export const FormInputsListItem = styled.li`
    
    &.textarea {
        grid-column: span 3;
    }
`

export const ButtonsBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
`

export const SubmitBtnWrapper = styled.div`
    position: relative;
`

export const SubmitErrorsBox = styled.div`
    position: absolute;
    right: 0;
    top: 110%;
    width: 310px;
    padding: ${theme.space[3]};
    border: ${theme.borders.normal} ${theme.colors.bg.dark};
    border-radius: ${theme.radii.m};
    background-color: ${theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
    opacity: 0;
    transition: ${theme.transition.primary};

    ${SubmitBtnWrapper}:hover & {
        opacity: 1;
    }
`

export const SubmitError = styled.p`
    color: ${theme.colors.danger};
`