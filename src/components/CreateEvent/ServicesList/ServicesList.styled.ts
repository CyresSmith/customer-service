import styled from 'styled-components';
import theme from 'utils/theme';

export const List = styled.ul`
    width: 100%;
`

export const ListItem = styled.li`
    width: 100%;
    padding: ${theme.space[2]};
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
        margin-bottom: ${theme.space[3]};
    }
`

export const ServiceName = styled.p`
    max-width: 50%;
    text-overflow: ellipsis;
`

export const RightWrapper = styled.div`
    display: flex;
    gap: ${theme.space[5]};
`

export const ServiceTime = styled.p`

`

export const ServicePrice = styled.p`
    font-weight: ${theme.fontWeights.bold};
`