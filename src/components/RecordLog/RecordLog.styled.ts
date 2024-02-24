import styled from 'styled-components';
import theme from 'utils/theme';

export const RecordContainer = styled.div<{ $columns: number }>`
    position: relative;
    width: 100%;
    /* height: 100%; */
    overflow: auto;
    border-radius: ${theme.radii.m};
    padding: ${theme.space[5]} 50px;
    background-color: ${theme.colors.bg.main};
`

export const ListsWrapper = styled.div`
    width: 100%;
    display: flex;
`