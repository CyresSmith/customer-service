import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: auto;
    gap: ${theme.space[4]};
    flex-wrap: wrap;
`

export const ListItem = styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.space[3]};
    padding: ${theme.space[2]};
    border: ${theme.borders.normal} ${theme.colors.accent.light};
    border-radius: ${theme.radii.xs};
    white-space: nowrap;
`

export const AvatarWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
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
    width: 100%;
    height: 100%;
`

export const Name = styled.p`
    width: calc(100% - ${theme.space[2]} * 2);
    font-size: ${theme.fontSizes.l};
    color: ${theme.colors.accent.light};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.space[3]};
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Position = styled.p`

`

