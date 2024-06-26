import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    padding: ${theme.space[4]} 0;

    @media ${theme.breakpoints.desktop.media} {
        min-width: 500px;
    }
`;

export const EventInfoList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
`;

export const EventInfoBox = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
        margin-bottom: ${theme.space[2]};
    }
`;

export const ListItemTitle = styled.p<{ $mb?: boolean }>`
    font-size: ${theme.fontSizes.l};
    margin-bottom: ${({ $mb = true }) => ($mb ? theme.space[1] : 0)};
    color: ${theme.colors.accent.light};
`;

export const ListItemText = styled.p`
    padding-left: 16px;
    font-size: ${theme.fontSizes.l};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const SubjectDetails = styled.button`
    padding: ${theme.space[3]};
    background-color: ${theme.colors.bg.light};
    border-radius: ${theme.radii.xl};
    width: 100%;
    color: inherit;
    transition: ${theme.transition.primary};

    &:hover {
        background-color: ${theme.colors.secondary.dark};
    }
`;

export const Total = styled.p`
    margin-top: ${theme.space[6]};
    border-top: 1px solid ${theme.colors.white};
    padding-top: ${theme.space[3]};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: ${theme.fontSizes.xxl};
    overflow: hidden;
    max-width: 100%;
`;

export const TotalInfo = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
`;
