import styled from 'styled-components';
// import theme from 'utils/theme';

export const Container = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
`

export const ContentBox = styled.div`
    width: 100%;
    height: 100%;
`

export const BtnsBox = styled.div<{$step: number | null}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => props.$step !== 1 ? 'space-between' : 'end'};
`