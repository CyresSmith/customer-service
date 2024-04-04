import styled from 'styled-components';
import theme from 'utils/theme';

export const SelectionBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[5]};
`;

export const ScheduleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[3]};
    width: 300px;
`;

export const Title = styled.p`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.bold};
`;

export const SelectDaysBox = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.space[3]};

    > li {
        > button {
            width: 100%;
        }
    }
`;

export const SelectBox = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: ${theme.space[2]};
`;

export const Message = styled.p`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.light};
    text-align: center;
`;

export const ButtonsBox = styled.div`
    display: flex;
    gap: ${theme.space[4]};
    justify-content: flex-end;
`;
