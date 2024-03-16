import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    justify-content: space-between;
`

export const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const BtnsBox = styled.div<{$step: string | null}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => props.$step !== 'create' ? 'space-between' : 'end'};
`