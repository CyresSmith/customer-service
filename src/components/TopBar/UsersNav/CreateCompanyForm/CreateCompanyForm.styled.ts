import styled from 'styled-components';
import theme from 'utils/theme';

export const FormContainer = styled.div`
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.h5`
    font-size: ${theme.fontSizes.xxl};
    margin-bottom: ${theme.space[6]};
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: -${theme.space[3]};
        left: 0;
        height: 1px;
        width: 100%;
        background-color: #fff;
    }
`;

export const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    margin-top: ${theme.space[6]};

    > button[id='next'] {
        margin-left: auto;
    }
`;
