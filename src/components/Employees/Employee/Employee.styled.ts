import styled from 'styled-components';
import theme from 'utils/theme';

export const EmployeeBox = styled.li`
  min-height: 82px;
  background-color: ${theme.colors.bg.main};
  border-radius: ${theme.radii.s};
  padding: ${theme.space[4]} 0;
  transition: ${theme.transition.primary};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.bg.light};
  }
`;

export const EmployeeImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.radii.round};
  overflow: hidden;
  background-color: ${theme.colors.bg.light};
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 35px;
    height: 35px;
    fill: ${theme.colors.secondary.light};
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const NameBox = styled.p`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[1]};
`;

export const Name = styled.span`
  font-size: ${theme.fontSizes.l};
  font-weight: ${theme.fontWeights.regular};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`;

export const JobTitle = styled.span`
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.light};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
`;
