import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.bg.dark};
    padding: ${theme.space[3]} ${theme.space[4]};
    border-radius: ${theme.radii.m};
    box-shadow: ${theme.shadow.m};
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${theme.colors.secondary.light};
    gap: ${theme.space[6]};
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

export const AvatarWrapper = styled.div`
    width: 100px;
    height: 100px;
    position: relative;
    border: ${theme.borders.normal} ${theme.colors.secondary.light};
    border-radius: ${theme.radii.round};
    overflow: hidden;
    margin-bottom: ${theme.space[5]};
`

export const Avatar = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: contain;
`