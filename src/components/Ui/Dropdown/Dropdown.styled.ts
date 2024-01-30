import styled from 'styled-components';
import theme from 'utils/theme';
import { Props } from './Dropdown';

export const DropWrapper = styled.div<Pick<Props, '$isOpen'>>`
  position: absolute;
  top: calc(100% + ${theme.space[3]});
  right: 0;
  background-color: ${theme.colors.bg.main};
  padding: ${theme.space[3]};
  border: ${theme.borders.normal} ${theme.colors.bg.main};
  border-radius: ${theme.radii.m};
  display: flex;
  max-height: ${props => (props.$isOpen ? '100vh' : '0')};
  transition: ${theme.transition.modal};
  box-shadow: ${theme.shadow.m}
`;

export const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  overflow: hidden;
`;
