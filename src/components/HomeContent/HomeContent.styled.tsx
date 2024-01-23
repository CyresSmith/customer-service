import styled from 'styled-components';

export const Container = styled.div`
    padding: ${({ theme }) => theme.space[4]};
    background-color: ${({ theme }) => theme.colors.componentsBg};
    border-radius: ${({ theme }) => theme.radii.s};
    height: 100%;
    box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
    -webkit-box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
    -moz-box-shadow: 1px 3px 13px 2px rgba(0,0,0,0.37);
`