import styled from 'styled-components';
import theme from 'utils/theme';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.space[6]};

    textarea {
        height: 200px;
        resize: none;
    }

    > div {
        display: flex;
        justify-content: center;
    }
`;
