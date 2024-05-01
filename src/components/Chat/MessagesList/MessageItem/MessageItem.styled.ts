import styled from 'styled-components';
import theme from 'utils/theme';

export type MessageStyled = {
    $isMy: boolean;
};

export const MessageBox = styled.li<MessageStyled>`
    max-width: 85%;
    padding: ${theme.space[3]} ${theme.space[4]};
    border-radius: ${({ $isMy }) =>
        $isMy
            ? `${theme.radii.l} ${theme.radii.l} 0 ${theme.radii.l}`
            : `${theme.radii.l} ${theme.radii.l} ${theme.radii.l} 0`};
    background-color: ${({ $isMy }) => ($isMy ? theme.colors.bg.main : theme.colors.bg.light)};
    align-self: ${({ $isMy }) => ($isMy ? 'end' : 'start')};
    font-size: ${theme.fontSizes.l};
    display: flex;
    gap: ${theme.space[4]};
    align-items: end;
`;

export const MessageTime = styled.span`
    font-size: ${theme.fontSizes.m};
    color: ${theme.colors.secondary.light};
`;
