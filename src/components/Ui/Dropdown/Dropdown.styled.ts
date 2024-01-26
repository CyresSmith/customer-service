import styled from 'styled-components';
import theme from 'utils/theme';
import { Props } from './Dropdown';

export const DropWrapper = styled.div<Pick<Props, '$isOpen'>>`
  position: absolute;
  top: 100%;
  right: 0;
  /* height: 100px; */
  background-color: ${theme.colors.bg.main};
  padding: ${theme.space[3]};
  border: ${theme.borders.normal} ${theme.colors.bg.main};
  border-radius: ${theme.radii.m};
  max-height: ${props => (props.$isOpen ? '100vh' : '0')};
  transition: ${theme.transition.modal};
  transition-duration: 1s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
`;

export const DropListItem = styled.li``;
