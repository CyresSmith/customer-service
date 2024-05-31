import styled from 'styled-components';
import theme from 'utils/theme';

export const ProfileInfoBox = styled.div`
    width: 100%;
    height: 100%;

    > form {
        width: 100%;
        height: 100%;
    }
`;

export const FormInputsList = styled.ul`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: ${theme.space[4]};

    @media ${theme.breakpoints.tablet.media} {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;

        :nth-last-child(2) {
            grid-column: 1 / 4;
        }
    }

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;

        :nth-last-child(2) {
            grid-column: 1 / 4;
        }
    }
`;

export const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
`;
