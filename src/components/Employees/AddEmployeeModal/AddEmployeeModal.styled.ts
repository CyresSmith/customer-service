import styled from 'styled-components';
import theme from 'utils/theme';

export const FormBox = styled.div`
    width: 400px;
`;

export const Message = styled.p`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.regular};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
    margin-bottom: ${theme.space[5]};
`;

export const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
