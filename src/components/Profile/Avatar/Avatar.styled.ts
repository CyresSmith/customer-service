import styled from 'styled-components';
import theme from 'utils/theme';

export const Wrapper = styled.div`
    position: relative;
    /* margin-bottom: ${theme.space[5]}; */
    width: 150px;
    height: 150px;
    border: ${theme.borders.bold} ${theme.colors.secondary.light};
    border-radius: ${theme.radii.round};
    transition: ${theme.transition.primary};

    &:hover {
        border-color: ${theme.colors.accent.main};
        box-shadow: 0px 0px 5px 1px rgba(255,176,0,1);
        -webkit-box-shadow: 0px 0px 5px 1px rgba(255,176,0,1);
        -moz-box-shadow: 0px 0px 5px 1px rgba(255,176,0,1);
    }

    &:focus {
        border-color: ${theme.colors.accent.main};
        box-shadow: 0px 0px 5px 1px rgba(255,176,0,1);
        -webkit-box-shadow: 0px 0px 5px 1px rgba(255,176,0,1);
        -moz-box-shadow: 0px 0px 5px 1px rgba(255,176,0,1);
    }
`

export const AvatarBox = styled.div`
    border-radius: ${theme.radii.round};
    width: 100%;
    height: 100%;
    position: relative;
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
    stroke: ${theme.colors.accent.main};
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
    bottom: -50px;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.space[2]};
`;

