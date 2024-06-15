import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    justify-content: space-between;
    overflow: hidden;

    @media ${theme.breakpoints.desktop.media} {
        min-height: 500px;
    }
`;

export const ContentBox = styled.div`
    max-width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const ChoseWayBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BtnsBox = styled.div<{ $step: string | null }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => (props.$step !== 'create' ? 'space-between' : 'end')};
`;

export const ChosenServices = styled.p`
    border-bottom: ${theme.borders.normal} ${theme.colors.white};
`;
