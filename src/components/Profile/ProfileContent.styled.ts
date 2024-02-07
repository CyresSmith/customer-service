import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.bg.dark};
    padding: ${theme.space[4]} ${theme.space[4]};
    border-radius: ${theme.radii.m};
    box-shadow: ${theme.shadow.m};
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${theme.colors.secondary.light};
    gap: ${theme.space[5]};
`

export const Title = styled.h2`
    font-size: ${theme.fontSizes.heading.s};
`

export const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SectionTitle = styled.h3`
    align-self: start;
    font-size: ${theme.fontSizes.xxl};
    margin-bottom: ${theme.space[5]};
`