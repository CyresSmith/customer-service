import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[6]};
`