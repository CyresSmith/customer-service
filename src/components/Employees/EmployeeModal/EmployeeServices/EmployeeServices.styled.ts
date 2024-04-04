import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeServicesBox = styled.div`
    width: 926px;
    height: 553px;
`;

export const ServiceDataBox = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space[4]};
`;

export const ServiceName = styled.p`
    font-size: ${theme.fontSizes.m};
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    white-space: nowrap;
`;

export const AddServiceModalBox = styled.div`
    height: 490px;
    width: 650px;
`;
