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
  border-radius: ${theme.radii.xs};
  height: ${props => (props.$isOpen ? '115px' : '0')};
  transition: ${theme.transition.modal};
  overflow: hidden;
`;

export const DropListItem = styled.li``;
