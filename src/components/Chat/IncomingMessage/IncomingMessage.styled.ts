import styled from 'styled-components';
import theme from 'utils/theme';

export const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
`;

export const UserBox = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
`;
