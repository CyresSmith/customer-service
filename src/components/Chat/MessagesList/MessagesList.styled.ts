import styled from 'styled-components';
import theme from 'utils/theme';

export const DateBadge = styled.div`
    font-size: ${theme.fontSizes.m};
    text-align: center;
    margin: ${theme.space[5]} 0;
    color: ${theme.colors.secondary.light};
`;

export const MessagesBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.bg.dark};
    padding: ${theme.space[3]};
    border-radius: ${theme.radii.s};
    gap: ${theme.space[3]};
`;

export const MessagesListBox = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
    flex-grow: 1;
    overflow-y: auto;
`;

export const MessageForm = styled.form`
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: ${theme.space[3]};
`;
