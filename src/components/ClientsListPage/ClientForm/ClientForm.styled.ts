import styled from 'styled-components';
import theme from 'utils/theme';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
`;

export const FormTitle = styled.h3`
    font-size: ${theme.fontSizes.heading.xs};
`;

export const FormSidesWrapper = styled.div`
    display: flex;
    gap: ${theme.space[4]};
`;

export const PhotoWrapper = styled.div`
    width: 200px;
    height: 200px;
    background-color: white;
`;

export const FormInputsList = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: ${theme.space[4]};

    @media ${theme.breakpoints.tablet.media} {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        :last-child {
            grid-column: 1 / 4;
        }
    }

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;

        :last-child {
            grid-column: 1 / 4;
        }
    }
`;

export const ButtonsBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media ${theme.breakpoints.tablet.media} {
        justify-content: end;
    }

    @media ${theme.breakpoints.desktop.media} {
        justify-content: end;
    }
`;

export const SubmitBtnWrapper = styled.div`
    position: relative;
`;

export const SubmitErrorsBox = styled.div`
    position: absolute;
    right: 0;
    top: calc(100% + ${theme.space[1]});
    width: 310px;
    padding: ${theme.space[3]};
    border: ${theme.borders.normal} ${theme.colors.bg.dark};
    border-radius: ${theme.radii.s};
    background-color: ${theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
    opacity: 0;
    transition: ${theme.transition.primary};

    ${SubmitBtnWrapper}:hover & {
        opacity: 1;
    }
`;

export const SubmitError = styled.p`
    display: inline-block;
    color: ${theme.colors.danger};
`;
