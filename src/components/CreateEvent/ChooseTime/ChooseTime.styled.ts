import styled from 'styled-components';
import theme from 'utils/theme';

export const SelectWrapper = styled.div`
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const NoEnableHours = styled.p`
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.danger.main};
`;
