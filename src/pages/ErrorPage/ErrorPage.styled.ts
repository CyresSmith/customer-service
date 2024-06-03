import styled from 'styled-components';
import theme from 'utils/theme';

export const PageBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[5]};
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

export const Message = styled.p`
    font-size: ${theme.fontSizes.xxl};
    font-weight: ${theme.fontWeights.bold};
`;
