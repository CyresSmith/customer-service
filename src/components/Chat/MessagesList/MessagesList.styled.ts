import styled from 'styled-components';
import theme from 'utils/theme';

export const MessagesBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.bg.dark};
    padding: ${theme.space[4]};
    border-radius: ${theme.radii.s};
    gap: ${theme.space[4]};
`;

export const MessagesHeader = styled.p`
    display: flex;
    align-items: center;
    gap: ${theme.space[4]};
`;

export const OnlineBadge = styled.span`
    display: block;
    width: 15px;
    height: 15px;
    border-radius: ${theme.radii.round};
    background-color: ${theme.colors.success.main};
    margin-left: auto;
`;

export const MessageCount = styled.span`
    padding: 0 ${theme.space[3]};
    border-radius: ${theme.radii.s};
    color: ${theme.colors.bg.dark};
    background-color: ${theme.colors.secondary.light};
    margin-left: auto;
`;

export const MessagesListBox = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
    flex-grow: 1;
    overflow-y: auto;
    border-radius: ${theme.radii.m} ${theme.radii.m} 0 0;
    position: relative;

    > li {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`;

export const DateBadge = styled.div`
    font-size: ${theme.fontSizes.m};
    text-align: center;
    margin: ${theme.space[5]} 0;
    color: ${theme.colors.secondary.light};
`;

export const CurrentDate = styled.div`
    font-size: ${theme.fontSizes.m};
    text-align: center;
    color: ${theme.colors.secondary.light};
    background-color: rgba(17, 17, 20, 0.5);
    position: fixed;
    padding: ${theme.space[4]} ${theme.space[2]};
    border-radius: ${theme.radii.m};
`;

export const MessageForm = styled.form`
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: ${theme.space[3]};
`;
