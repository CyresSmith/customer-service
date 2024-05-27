import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul<{ $columns: number; $isScroll: boolean }>`
    display: grid;
    grid-template-columns: repeat(${props => props.$columns}, 1fr);
    padding: 0 60px;
    margin-right: ${props => (props.$isScroll ? '5px' : 0)};
`;

export const ListItem = styled.li<{ $last: boolean }>`
    width: 100%;
    display: flex;
    gap: ${theme.space[3]};
    padding: ${theme.space[3]};
    border-right: ${({ $last }) =>
        $last ? 'none' : `${theme.borders.normal} ${theme.colors.bg.light}`};
    overflow: hidden;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.space[2]};
    white-space: nowrap;
    overflow: hidden;
    flex: 1;
`;

export const EmployeeName = styled.p`
    font-size: ${theme.fontSizes.l};
    overflow: hidden;
    text-overflow: ellipsis;

    @media ${theme.breakpoints.mobile.media} {
        width: 100%;
    }

    @media ${theme.breakpoints.tablet.media} {
        max-width: 100%;
    }

    @media ${theme.breakpoints.desktop.media} {
        max-width: 100%;
    }
`;

export const EmployeeDaySchedule = styled.p`
    font-size: ${theme.fontSizes.m};
    color: ${theme.colors.secondary.main};
    overflow: hidden;
    text-overflow: ellipsis;
`;
