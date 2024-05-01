import styled from 'styled-components';
import theme from 'utils/theme';

export const ListBox = styled.div`
    display: flex;
    gap: ${theme.space[3]};
    flex-grow: 1;
`;

export const List = styled.ul`
    flex-grow: 1;
    overflow-y: scroll;
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.s};
    padding: ${theme.space[3]};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
`;

export const ChannelGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
`;
