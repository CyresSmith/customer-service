import styled from 'styled-components';
import theme from 'utils/theme';

export const ListBox = styled.div`
    display: flex;
    max-height: 100%;
    flex-direction: column;
`;

export const ListBar = styled.div`
    width: 100%;
    display: flex;
    /* flex-direction: column; */
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
    gap: ${theme.space[5]};
    margin-bottom: ${theme.space[4]};
    border-bottom: ${theme.borders.normal} ${theme.colors.secondary.main};
    padding-bottom: ${theme.space[4]};

    @media ${theme.breakpoints.desktop.media} {
        flex-direction: row;
        align-items: end;
        justify-content: space-between;
    }
`;

export const FilterBox = styled.div<{ $rowsCount: number }>`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    align-items: center;
    gap: ${theme.space[4]};

    @media ${theme.breakpoints.mobile.media} {
        width: 100%;
    }

    @media ${theme.breakpoints.tablet.media} {
        grid-template-columns: ${({ $rowsCount }) => `repeat(${$rowsCount}, 242px)`};
        grid-template-rows: 1fr;
    }

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: ${({ $rowsCount }) => `repeat(${$rowsCount}, 242px)`};
        grid-template-rows: 1fr;
    }
`;

export const SearchBox = styled.div`
    position: relative;

    @media ${theme.breakpoints.desktop.media} {
        display: flex;
        align-items: center;
        gap: ${theme.space[4]};
    }
`;

export enum AvatarSize {
    S = '40px',
    M = '50px',
    L = '80px',
}

export const AvatarBox = styled.div<{ size?: AvatarSize }>`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: ${theme.radii.round};
    overflow: hidden;
    background-color: ${theme.colors.secondary.light};
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
        width: 35px;
        height: 35px;
        fill: ${theme.colors.bg.main};
    }

    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    > span {
        font-size: ${({ size }) =>
            size === AvatarSize.S ? '17px' : size === AvatarSize.M ? '25px' : '55px'};
        font-weight: ${theme.fontWeights.light};
        text-transform: uppercase;
        color: ${theme.colors.bg.main};
    }
`;

export const ButtonBox = styled.div<{ $hideButton: boolean }>`
    position: absolute;
    top: 50%;
    right: 0;
    height: 33px;
    width: 39px;
    overflow: hidden;
    transform: translateY(-50%);

    > button {
        position: absolute;
        right: 0;
        top: 50%;
        transform: ${({ $hideButton }) =>
            $hideButton ? `translate(100%, -50%)` : ` translate(0, -50%)`};
    }
`;

type ListGridProps = {
    $columnsCount: number;
    $isDeleteButton: boolean;
    $selected?: boolean;
    $isActive?: boolean;
    $avatarSize?: AvatarSize;
};

export const ListHeader = styled.ul<ListGridProps>`
    display: grid;
    grid-template-columns: ${({ $columnsCount, $isDeleteButton, $avatarSize }) =>
        `${$avatarSize} repeat(${$columnsCount}, calc(((${
            $isDeleteButton ? '100% - 50px' : '100%'
        }) - (${theme.space[4]} * ${
            $isDeleteButton ? $columnsCount + 4 : $columnsCount + 3
        })) / ${$columnsCount}) ) ${$isDeleteButton ? '50px' : ''}`};
    padding: 0 ${theme.space[4]};
    justify-items: center;
    gap: ${theme.space[4]};
`;

export const ListHeaderItem = styled.li`
    justify-self: center;
    overflow: hidden;
    max-width: 100%;

    > button {
        padding: ${theme.space[2]} 0;
        overflow: hidden;
        max-width: 100%;

        > span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
        }
    }

    &:first-of-type {
        justify-self: start;
    }

    &:last-of-type {
        justify-self: end;
    }
`;

export const List = styled.ul`
    /* height: calc(100% - 101px);
    flex-grow: 1; */
    max-height: 100%;
    flex: 1;
    overflow-y: scroll;
`;

export const ItemBox = styled.li<ListGridProps>`
    position: relative;
    display: grid;
    grid-template-columns: ${({ $columnsCount, $isDeleteButton, $avatarSize }) =>
        `${$avatarSize} repeat(${$columnsCount},   calc((100% - ((${
            $isDeleteButton ? '100px' : '50px'
        }) + ${theme.space[4]} * ${
            $isDeleteButton ? $columnsCount + 1 : $columnsCount
        })) / ${$columnsCount})) ${$isDeleteButton ? '50px' : ''}`};
    cursor: pointer;
    padding: ${theme.space[3]};
    transition: ${theme.transition.primary};
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.xl};
    align-items: center;
    gap: ${theme.space[4]};
    animation: ${theme.animation.appear};
    animation-duration: 500ms;
    transition: ${theme.transition.primary};
    background-color: ${({ $isActive }) =>
        $isActive ? theme.colors.primary.main : theme.colors.bg.light};
    overflow: hidden;
    box-shadow: ${theme.shadow.s};

    & > svg[id='checkLabel'] {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 5px;
        left: -35px;
        transform: ${({ $selected }) => ($selected ? 'translateX(40px)' : '0')};
        transition: ${theme.transition.primary};
        fill: ${theme.colors.accent.main};
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    }

    &:not(:last-of-type) {
        margin-bottom: ${theme.space[3]};
    }

    &:hover {
        background-color: ${({ $isActive }) =>
            $isActive ? theme.colors.primary.main : theme.colors.secondary.dark};
    }
`;

export const ItemParam = styled.p`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.light};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    white-space: nowrap;

    &:first-letter {
        text-transform: uppercase;
    }

    &:last-of-type {
        text-align: right;
    }

    &:first-of-type {
        text-align: left;
    }
`;

export const Name = styled.span`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.regular};
`;
