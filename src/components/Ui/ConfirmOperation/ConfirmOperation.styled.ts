import styled from 'styled-components';
import theme from 'utils/theme';

export const ConfirmContainer = styled.div`
    padding: ${theme.space[4]};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[5]};
`;

export const ConfirmText = styled.p`
    font-size: ${theme.fontSizes.xxl};
    text-align: center;
`;

export const ConfirmBtnsWrapper = styled.div`
    display: flex;
    gap: ${theme.space[4]};
    margin: 0 auto;
`;
