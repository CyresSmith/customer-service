import styled from 'styled-components';
import theme from 'utils/theme';

type SwitcherType = {
    $border?: 'light' | 'dark';
    $borderRadius?: 'xs' | 's' | 'm';
    $type?: 'day' | 'month' | 'year';
};

export const Container = styled.div<SwitcherType>`
    position: relative;
    min-width: ${props =>
        props.$type === 'month' ? '150px' : props.$type === 'year' ? '150px' : '200px'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: ${props =>
        props.$borderRadius ? `${theme.radii[props.$borderRadius]}` : 'none'};
    border-width: ${props => (props.$border ? `${theme.borders.normal}` : 'none')};
    border-color: ${props =>
        props.$border === 'light'
            ? `${theme.colors.secondary.dark}`
            : props.$border === 'dark'
            ? `${theme.colors.bg.main}`
            : null};
`;

export const DateWrapper = styled.div<Pick<SwitcherType, '$border' | '$type'>>`
    text-align: center;
    border-left: ${({ $border }) =>
        $border
            ? `${theme.borders.normal} ${
                  $border === 'light'
                      ? `${theme.colors.secondary.dark}`
                      : $border === 'dark'
                      ? `${theme.colors.bg.main}`
                      : ''
              }`
            : 'none'};

    border-right: ${({ $border }) =>
        $border
            ? `${theme.borders.normal} ${
                  $border === 'light'
                      ? `${theme.colors.secondary.dark}`
                      : $border === 'dark'
                      ? `${theme.colors.bg.main}`
                      : ''
              }`
            : 'none'};

    width: ${props =>
        props.$type === 'month' ? '100px' : props.$type === 'year' ? '70px' : '150px'};
    white-space: nowrap;
`;

export const DateValue = styled.p<{ $fontSize?: string }>`
    font-size: ${({ $fontSize }) => $fontSize || theme.fontSizes.l};
    overflow: hidden;
    text-overflow: ellipsis;

    &::first-letter {
        text-transform: uppercase;
    }
`;

export const ReturnBtnWrapper = styled.div`
    margin-left: ${theme.space[4]};
`;
