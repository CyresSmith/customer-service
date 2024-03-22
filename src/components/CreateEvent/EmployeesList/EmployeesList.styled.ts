import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, calc((100% - ${theme.space[4]} * 2) / 3));
    grid-template-rows: auto;
    gap: ${theme.space[4]};
    flex-wrap: wrap;
    margin-top: ${theme.space[4]};
`

export const ListItem = styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.space[3]};
    padding: ${theme.space[3]};
    border: ${theme.borders.normal} ${theme.colors.secondary.dark};
    border-radius: ${theme.radii.xs};
    white-space: nowrap;
    cursor: pointer;
    transition: ${theme.transition.primary};

    &:hover,
    :focus-visible {
        border-color: ${theme.colors.secondary.main};
        box-shadow: ${theme.shadow.m};
    }
`

export const AvatarWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${theme.borders.normal} ${theme.colors.secondary.main};
    border-radius: ${theme.radii.round};
    overflow: hidden;
`

export const Avatar = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const NoAvatarIcon = styled.svg`
    width: 50%;
    height: 50%;
    fill: ${theme.colors.secondary.main};
`
export const TextBox = styled.div`
    width: 100%;
    text-align: center;
`

export const Name = styled.p`
    width: 100%;
    font-size: ${theme.fontSizes.l};
    color: ${theme.colors.accent.light};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.space[3]};
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Position = styled.p`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`

