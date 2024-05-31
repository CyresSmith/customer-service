import styled from 'styled-components';
import theme from 'utils/theme';

export const ModalBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 245px;

    @media ${theme.breakpoints.tablet.media} {
        min-height: 500px;
    }

    @media ${theme.breakpoints.desktop.media} {
        min-height: 500px;
    }
`;

export const StepBox = styled.div`
    display: flex;
    gap: ${theme.space[2]};
    margin-bottom: ${theme.space[5]};
    transition: ${theme.transition.primary};
    overflow: hidden;
    max-width: 250px;

    @media ${theme.breakpoints.tablet.media} {
        gap: ${theme.space[5]};
        max-width: 100%;
    }

    @media ${theme.breakpoints.desktop.media} {
        gap: ${theme.space[5]};
        max-width: 100%;
    }
`;

export const Step = styled.div<{ $current: boolean; $color: boolean }>`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    transition: ${theme.transition.primary};
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.light};
    color: ${theme.colors.accent.light};
    max-width: ${({ $current }) => ($current ? '150px' : '50px')};
    margin-right: ${({ $current }) => ($current ? 'auto' : 0)};
    overflow: hidden;

    @media ${theme.breakpoints.mobile.media} {
        font-size: ${theme.fontSizes.s};
    }
`;

export const StepNumber = styled.span<{ $current: boolean }>`
    width: 50px;
    height: 50px;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.radii.round};
    border: ${theme.borders.normal};
    border-color: ${({ $current }) =>
        $current ? theme.colors.accent.light : theme.colors.bg.light};
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.light};
    color: ${({ $current }) => ($current ? theme.colors.accent.light : theme.colors.bg.light)};
`;

export const FirstStepBox = styled.div`
    display: flex;
    gap: ${theme.space[5]};
    flex-grow: 1;

    @media ${theme.breakpoints.mobile.media} {
        flex-direction: column;
    }
`;

export const SecondStepBox = styled.div``;

export const StepFormBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    min-height: 363px;
    max-width: 100%;
`;

export const FormSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
`;

export const Form = styled.form`
    width: 400px;
`;

export const SelectBox = styled.div``;

export const StepButtonsBox = styled.div<{ $IsOneButton: boolean }>`
    display: flex;
    justify-content: ${({ $IsOneButton }) => ($IsOneButton ? 'end' : 'space-between')};
    width: 100%;
    margin-top: ${theme.space[5]};
`;

export const ButtonBox = styled.div`
    display: flex;
    justify-content: end;
    margin-top: ${theme.space[6]};
`;

export const DurationBox = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    max-width: 100%;
`;

export const TimeBox = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[2]};
`;
