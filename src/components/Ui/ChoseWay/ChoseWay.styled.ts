import styled from 'styled-components';
import theme from 'utils/theme';

const WAY_LIST_GAP = theme.space[5];
const WAY_MAX_WIDTH = '210px';
const WAY_GAP = theme.space[3];

export const WayList = styled.ul`
    /* display: grid;
    max-width: calc((${WAY_MAX_WIDTH} * 2) + ${WAY_LIST_GAP});
    grid-template-columns: repeat(2, calc((100% - ${WAY_LIST_GAP}) / 2));
    grid-template-rows: auto; */

    width: calc((${WAY_MAX_WIDTH} * 2) + ${WAY_LIST_GAP});
    display: flex;
    flex-wrap: wrap;
    gap: ${WAY_LIST_GAP};
    margin: 0 auto;

    @media ${theme.breakpoints.mobile.media} {
        flex-direction: column;
    }
`;

export const Way = styled.button`
    width: 100%;
    width: ${WAY_MAX_WIDTH};
    aspect-ratio: 1/1;
    padding: ${theme.space[4]};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60% 1fr;
    gap: ${WAY_GAP};
    align-items: center;
    justify-items: center;
    border: ${theme.borders.bold};
    border-color: ${theme.colors.white};
    border-radius: ${theme.radii.m};
    cursor: pointer;
    transition: ${theme.transition.primary};
    overflow: hidden;
    color: ${theme.colors.white};
    fill: ${theme.colors.white};

    &:hover,
    :focus-visible {
        color: ${theme.colors.accent.main};
        fill: ${theme.colors.accent.main};
        border-color: ${theme.colors.accent.main};
    }
`;

export const TitleBox = styled.div`
    width: 100%;
    overflow: hidden;
`;

export const WayIcon = styled.svg`
    width: 50px;
    height: 50px;
    fill: inherit;
    margin-bottom: ${theme.space[2]};
`;

export const WayTitle = styled.h6`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.bold};
    color: inherit;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const WayDesc = styled.p`
    width: 100%;
    height: 100%;
    font-size: ${theme.fontSizes.m};
    font-style: italic;
    color: inherit;
    align-self: self-start;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    border-color: inherit;

    &:before {
        content: '';
        width: 100%;
        display: block;
        border-bottom: ${theme.borders.normal};
        border-color: inherit;
        margin-bottom: ${WAY_GAP};
    }
`;
