import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    padding: ${theme.space[4]};
`;

export const EventInfoList = styled.ul``;

export const EventInfoListItem = styled.li`
    &:not(:last-child) {
        margin-bottom: ${theme.space[3]};
    }
`;

export const ListItemTitle = styled.p`
    font-size: ${theme.fontSizes.l};
    margin-bottom: ${theme.space[1]};
    color: ${theme.colors.accent.light};
`;

export const ListItemText = styled.p`
    display: block;
    padding-left: 16px;
    font-size: ${theme.fontSizes.l};
`;

export const SubjectDetails = styled.div`
    padding: ${theme.space[2]} ${theme.space[3]};
    background-color: ${theme.colors.bg.light};
    border-radius: ${theme.radii.l};
    width: 100%;
    display: flex;
    align-items: center;
`;

export const SubjectInfoWrapper = styled.div`
    margin-left: ${theme.space[3]};
`;

export const SubjectName = styled.p`
    font-size: ${theme.fontSizes.l};
`;

export const SubjectDesc = styled.p`
    font-size: ${theme.fontSizes.m};
    color: ${theme.colors.secondary.light};
`;

export const AvatarBox = styled.div`
    width: 30px;
    height: 30px;
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
        font-size: 15px;
        font-weight: ${theme.fontWeights.light};
        text-transform: uppercase;
        color: ${theme.colors.bg.main};
    }
`;
