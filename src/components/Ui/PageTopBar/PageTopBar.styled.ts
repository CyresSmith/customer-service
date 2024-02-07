import styled from 'styled-components';
import theme from 'utils/theme';

export const TopBar = styled.div`
    width: 100%;
    min-height: 30px;
    border-bottom: ${theme.borders.normal} ${theme.colors.bg.main};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: ${theme.space[3]};
`