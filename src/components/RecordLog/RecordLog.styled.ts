import styled from 'styled-components';
import theme from 'utils/theme';

export const RecordContainer = styled.div<{ $columns: number }>`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    border-radius: ${theme.radii.m};
    padding: ${theme.space[4]} 50px;
`

export const ListsWrapper = styled.div`
    position: absolute;
    z-index: 1;
    left: 50px;
    /* right: 50px; */
    height: 100%;
    width: calc(100% - 100px);
    display: flex;
`