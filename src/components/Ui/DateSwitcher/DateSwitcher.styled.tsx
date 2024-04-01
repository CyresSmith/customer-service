import styled from 'styled-components';
import theme from 'utils/theme';

type SwitcherType = {
    $border?: 'light' | 'dark',
    $borderRadius?: 'xs' | 's' | 'm',
    $type?: 'day' | 'month' | 'year'
};

export const Container = styled.div<SwitcherType>`
    position: relative;
    width: ${props => props.$type === 'month' ? '150px' : props.$type === 'year' ? '100px' : '200px'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: ${props => props.$borderRadius ? `${theme.radii[props.$borderRadius]}` : 'none'};
    border: ${props => props.$border ? `${theme.borders.normal}` : 'none'} ${props => props.$border === 'light' ? `${theme.colors.secondary.dark}` : props.$border === 'dark' ? `${theme.colors.bg.main}` : null};
`

export const DateWrapper = styled.div<Pick<SwitcherType, '$border' | '$type'>>`
    text-align: center;
    padding: ${theme.space[2]} ${theme.space[3]};
    border-left: ${props => props.$border ? `${theme.borders.normal}` : 'none'} ${props => props.$border === 'light' ? `${theme.colors.secondary.dark}` : props.$border === 'dark' ? `${theme.colors.bg.main}` : null};
    border-right: ${props => props.$border ? `${theme.borders.normal}` : 'none'} ${props => props.$border === 'light' ? `${theme.colors.secondary.dark}` : props.$border === 'dark' ? `${theme.colors.bg.main}` : null};
    width: ${props => props.$type === 'month' ? '100px' : props.$type === 'year' ? '50px' : '150px'};
    white-space: nowrap;
`

export const DateValue = styled.p<{$fontSize: string}>`
    font-size: ${props => props.$fontSize};
    overflow: hidden;
    text-overflow: ellipsis;

    &::first-letter {
        text-transform: uppercase;
    }
`

export const ReturnBtnWrapper = styled.div`
    position: absolute;
    right: -30%;
`