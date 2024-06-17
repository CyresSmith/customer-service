import { LAYOUT_GAP, LAYOUT_PADDING } from 'components/Layout/MainLayout/MainLayout.styled';
import { HEADER_HIGHT } from 'components/TopBar/TopBar.styled';
import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;

    @media ${theme.breakpoints.desktop.media} {
        display: flex;
        gap: ${theme.space[4]};
        overflow: hidden;
    }
`;

export const LeftWrapper = styled.div`
    height: 100%;
    padding-top: ${theme.space[3]};
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.m};
    overflow: hidden;

    @media ${theme.breakpoints.desktop.media} {
        flex: 1;
    }
`;

export const RightWrapper = styled.div<{ $isOpen: boolean }>`
    max-height: 100%;
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.l};

    @media ${theme.breakpoints.mobile.media} {
        max-width: calc(100% - (${LAYOUT_PADDING} * 2));
        position: fixed;
        right: ${LAYOUT_PADDING};
        top: calc(${HEADER_HIGHT} + ${LAYOUT_GAP} + 164px + (${theme.space[4]} * 4));
        transition: ${theme.transition.primary};
        transform: ${({ $isOpen }) => ($isOpen ? `` : `translateX(120%)`)};
        z-index: 110;
    }

    @media ${theme.breakpoints.tablet.media} {
        max-width: calc(100% - (${LAYOUT_PADDING} * 2));
        position: fixed;
        right: ${LAYOUT_PADDING};
        top: calc(${HEADER_HIGHT} + ${LAYOUT_GAP} + 107px + (${theme.space[4]} * 5));
        transition: ${theme.transition.primary};
        transform: ${({ $isOpen }) => ($isOpen ? `` : `translateX(120%)`)};
        z-index: 110;
    }
`;

export const ScrollWrapper = styled.div`
    overflow: auto;
    height: calc(100% - 55px);

    @media ${theme.breakpoints.mobile.media} {
        padding-bottom: ${theme.space[4]};
    }
`;

export const EmployeesListWrapper = styled.div`
    position: relative;
`;

export const BtnWrapper = styled.div<{ $left?: string; $right?: string }>`
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: ${props => (props.$left ? props.$left : null)};
    right: ${props => (props.$right ? props.$right : null)};
`;

export const SchedulesContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: ${theme.space[5]};
`;

export const ListsWrapper = styled.div<{ $columns: number }>`
    width: 100%;
    padding: ${theme.space[4]} ${theme.space[4]} ${theme.space[4]} 60px;
    display: grid;
    grid-template-columns: repeat(${props => props.$columns}, 1fr);
    grid-template-rows: auto;

    @media ${theme.breakpoints.tablet.media} {
        padding: ${theme.space[4]} 60px;
    }

    @media ${theme.breakpoints.desktop.media} {
        padding: ${theme.space[4]} 60px;
    }
`;

export const NoDataWrapper = styled.div`
    margin: auto auto;
    text-align: center;
`;

export const NoSchedule = styled.p`
    font-size: ${theme.fontSizes.heading.xs};
    justify-self: center;
    margin-bottom: ${theme.space[4]};
`;
