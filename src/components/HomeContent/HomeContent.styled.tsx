import styled from 'styled-components';

export const Container = styled.div`
    padding: ${({ theme }) => theme.space[3]};
    border: ${({ theme }) => theme.borders.normal} #fff;
`