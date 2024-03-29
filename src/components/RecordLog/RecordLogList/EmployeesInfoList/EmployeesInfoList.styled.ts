import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul<{ $columns: number, $isScroll: boolean}>`
    display: grid;
    grid-template-columns: repeat(${props => props.$columns}, 1fr);
    padding: 0 60px;
    margin-right: ${props => props.$isScroll ? '5px' : 0};
`

export const ListItem = styled.li<{ $last: boolean }>`
    width: 100%;
    display: flex;
    gap: ${theme.space[3]};
    padding: ${theme.space[3]};
    border-right: ${props => props.$last ? 'none' : `${theme.borders.normal} ${theme.colors.bg.light}`};
    overflow: hidden;
`

export const AvatarWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    height: 40px;
    border-radius: ${theme.radii.round};
    overflow: hidden;
    background-color: ${theme.colors.bg.dark};
`

export const Avatar = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
`

export const NoAvatar = styled.p`
    font-size: ${theme.fontSizes.heading.xs};
    text-transform: uppercase;
`

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.space[2]};
    max-width: calc(100% - 70px);
    white-space: nowrap;
`

export const EmployeeName = styled.p`
    max-width: 100%;
    font-size: ${theme.fontSizes.l};
    overflow: hidden;
    text-overflow: ellipsis;
`

export const EmployeeDaySchedule = styled.p`
    font-size: ${theme.fontSizes.m};
    color: ${theme.colors.secondary.main};
    overflow: hidden;
    text-overflow: ellipsis;
`