import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    gap: ${theme.space[4]};
    justify-content: end;
    height: 100%;
`;

export const LeftWrapper = styled.div`
    width: 100%;
    padding-top: ${theme.space[3]};
    background-color: ${theme.colors.bg.main};
    border-radius: ${theme.radii.m};
`;

export const RightWrapper = styled.div`
    height: 100%;
`;

export const ScrollWrapper = styled.div`
    overflow: auto;
    height: calc(100% - 55px);
`;

export const EmployeesListWrapper = styled.div`
    position: relative;
`;

export const BtnWrapper = styled.div<{ $left?: string; $right?: string }>`
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: ${props => (props.$left ? props.$left : null)};
    right: ${props => (props.$right ? props.$right : null)};
`;

export const SchedulesContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const ListsWrapper = styled.div<{ $columns: number }>`
    width: 100%;
    padding: ${theme.space[4]} 60px;
    display: grid;
    grid-template-columns: repeat(${props => props.$columns}, 1fr);
    grid-template-rows: auto;
`;

export const NoDataWrapper = styled.div`
    margin: auto auto;
    text-align: center;
`;

export const NoSchedule = styled.p`
    font-size: ${theme.fontSizes.heading.xs};
    justify-self: center;
    margin-bottom: ${theme.space[4]};
`;
