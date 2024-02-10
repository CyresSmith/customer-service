import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
    overflow: auto;
`

export const ListItem = styled.li`
    width: 100%;
    display: flex;
    gap: ${theme.space[3]};
    align-items: center;
    padding: ${theme.space[3]};
    border-radius: ${theme.radii.s};
    background-color: ${theme.colors.bg.main};
    cursor: pointer;
    transition: ${theme.transition.primary};

    &:hover,
    :focus-visible {
        background-color: ${theme.colors.bg.light};
    }
`

export const AvatarWrapper = styled.div`
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.round};
    overflow: hidden;
`

export const Avatar = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    object-fit: contain;
`
export const Name = styled.p`
    font-size: ${theme.fontSizes.l};
`

export const NoClients = styled.p`
    font-size: ${theme.fontSizes.xxl};
`