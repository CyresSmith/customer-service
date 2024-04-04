import styled from 'styled-components';
import theme from 'utils/theme';

type DatePickerProps = {
  $bgColor: 'dark' | 'light';
  $isOpen: boolean;
};

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Picker = styled.input<Pick<DatePickerProps, '$isOpen'>>`
  color: ${theme.colors.bg.dark};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.radii.s};
  background-color: ${theme.colors.secondary.light};
  border: ${theme.borders.normal}
    ${props =>
      props.$isOpen ? theme.colors.accent.main : theme.colors.bg.dark};
  box-shadow: ${props =>
    props.$isOpen
      ? `0px 0px 5px 1px rgba(255, 176, 0, 1);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);`
      : 'none'};
  transition: ${theme.transition.primary};
  font-size: ${theme.fontSizes.l};
  width: 100%;
  outline: none;
  resize: none;
  cursor: pointer;
`;

export const DateRow = styled.p``;

export const PickerIcon = styled.svg<Pick<DatePickerProps, '$isOpen'>>`
  fill: ${props => (props.$isOpen ? theme.colors.accent.main : 'inherit')};
  position: absolute;
  right: ${theme.space[3]};
  top: 50%;
  transform: translate(0, -50%);
  width: 25px;
  height: auto;
  transition: ${theme.transition.primary};
`;

export const DateBox = styled.div<DatePickerProps>`
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: calc(100% + ${theme.space[2]});
  right: 50%;
  transform: translate(50%, 0);
  padding: ${theme.space[3]};
  border-radius: ${theme.radii.m};
  background-color: ${props =>
    props.$bgColor === 'dark'
      ? theme.colors.bg.main
      : theme.colors.secondary.main};
  max-height: ${props => (props.$isOpen ? '1000px' : '0')};
  transition: ${theme.transition.drop};
  overflow: hidden;
  box-shadow: ${theme.shadow.m};
`;

export const BtnsWrapper = styled.div`
  display: flex;
  gap: ${theme.space[4]};
  margin: 0 auto;
  margin-top: ${theme.space[4]};
`;
