import styled from 'styled-components';
import theme from 'utils/theme';

export const Wrapper = styled.div`
    position: relative;
    margin-bottom: ${theme.space[5]};
`

export const AvatarBox = styled.div`
    width: 100px;
    height: 100px;
    position: relative;
    border: ${theme.borders.bold} ${theme.colors.secondary.light};
    border-radius: ${theme.radii.round};
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
`

export const StyledCamera = styled.svg`
    width: 50px;
    height: 50px;
    fill: ${theme.colors.secondary.light};
    transition: ${theme.transition.primary};

    ${AvatarBox}:hover &{
        opacity: 0;
    };
    ${AvatarBox}:focus-visible &{
        opacity: 0;
    }
`

export const StyledUpload = styled.svg`
    width: 50px;
    height: 50px;
    stroke: ${theme.colors.secondary.light};
`

export const Backdrop = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    transform: translate(0, 100%);
    background-color: ${theme.colors.backdrop};
    transition: ${theme.transition.primary};

    ${AvatarBox}:hover &{
        transform: translate(0, 0);
    };
    ${AvatarBox}:focus-visible &{
        transform: translate(0, 0);
    }
`

export const ButtonsBox = styled.div`
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.space[2]};
`;

