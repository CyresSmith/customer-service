import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div``;

export const Skeleton = styled.div`
    height: 350px;
    width: 800px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ClientName = styled.p`
    font-size: ${theme.fontSizes.heading.xs};
    margin-bottom: ${theme.space[3]};
`;

export const SidesWrapper = styled.div`
    display: flex;
    gap: ${theme.space[5]};
`;

export const LeftSideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const BtnWrapper = styled.div`
    width: fit-content;
`;

export const Bar = styled.div`
    display: flex;
    gap: ${theme.space[4]};
    padding: ${theme.space[3]} 0;
    border-bottom: ${theme.borders.normal} ${theme.colors.bg.light};
    margin-bottom: ${theme.space[4]};
`;
