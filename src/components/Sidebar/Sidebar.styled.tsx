import styled from 'styled-components';

export const Container = styled.aside`
    padding: ${({ theme }) => theme.space[3]};
    border: ${({ theme }) => theme.borders.normal} #fff;
`