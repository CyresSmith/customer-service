import styled from 'styled-components';
import theme from 'utils/theme';

const EMPLOYEE_HIGHT = 62;
const VISIBLE_EMPLOYEES = 6;

export const EmployeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[0]};
    max-height: calc(
        (${EMPLOYEE_HIGHT}px * ${VISIBLE_EMPLOYEES}) +
            (${theme.space[0]} * (${VISIBLE_EMPLOYEES} - 1))
    );
    overflow-x: hidden;
`;

const IMAGE_SIZE = 50;

export const Employee = styled.button<{ $selected: boolean }>`
    display: flex;
    gap: ${theme.space[4]};
    align-items: center;
    color: ${theme.colors.white};
    width: 100%;
    padding: ${theme.space[2]};
    border-radius: ${theme.radii.s};
    transition: ${theme.transition.primary};
    height: ${EMPLOYEE_HIGHT}px;

    &:hover {
        background-color: ${theme.colors.bg.light};

        > svg {
            fill: ${theme.colors.accent.main};
        }
    }

    > svg {
        fill: ${theme.colors.accent.light};
        transition: ${theme.transition.primary};
        transform: ${({ $selected }) => ($selected ? 'translateX(0)' : 'translateX(150%)')};
    }
`;

export const EmployeeDataBox = styled.div<{ $checkIcon: boolean }>`
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: ${theme.space[4]};
    width: 100%;
    text-overflow: ellipsis;
`;

export const EmployeeImg = styled.div`
    width: ${IMAGE_SIZE}px;
    height: ${IMAGE_SIZE}px;
    border-radius: ${theme.radii.round};
    overflow: hidden;
    position: relative;
    background-color: ${theme.colors.secondary.main};
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    > p {
        font-size: calc(${IMAGE_SIZE}px * 0.6);
    }
`;

export const CHECK_SIZE = 30;
export const SPACE = theme.space[4];

export const Name = styled.p`
    font-size: ${theme.fontSizes.l};
    font-weight: ${theme.fontWeights.light};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
`;

export const JobTitle = styled.span`
    font-size: ${theme.fontSizes.m};
    font-weight: ${theme.fontWeights.light};
    color: ${theme.colors.secondary.light};

    &:first-letter {
        text-transform: uppercase;
    }
`;

export const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: ${theme.space[6]};
`;
