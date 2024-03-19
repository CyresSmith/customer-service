import styled from 'styled-components';
import theme from 'utils/theme';

const baseInputStyles = `
  color: ${theme.colors.bg.dark};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.radii.s};
  background-color: ${theme.colors.secondary.light};
  border: ${theme.borders.normal} ${theme.colors.bg.dark};
  transition: ${theme.transition.primary};
  font-size: ${theme.fontSizes.l};
  width: 100%;
  resize: none;
  outline: none;
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${theme.space[5]};
  justify-content: center;
`;

export const FormTitle = styled.p`
  text-align: center;
  font-size: ${theme.fontSizes.heading.xs};
`;

export const FormInputsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
  justify-content: center;
`;

export const FormInputsListItem = styled.div<{ $type?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.space[1]};
  grid-column: ${props => (props.$type === 'textarea' ? 'span 3' : 'auto')};
`;

export const FormInputLabel = styled.label`
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const Required = styled.span`
  font-size: inherit;
  color: ${theme.colors.danger.light};
`;

export const FormInputBox = styled.div`
  position: relative;
`;

export const HideButton = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: ${theme.space[3]};
  top: 50%;
  transform: translateY(-50%);
`;

export const HideIcon = styled.svg<{ hidden: boolean }>`
  width: 20px;
  height: 20px;
  transition: ${theme.transition.primary};
  fill: ${({ hidden }) =>
    hidden ? theme.colors.secondary.main : theme.colors.secondary.dark};
`;

export const FormInput = styled.input`
  ${baseInputStyles};

  &:focus {
    border-color: ${theme.colors.accent.main};
    box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
  }
`;

export const ButtonsWrapper = styled.div<{ $direction: string | undefined }>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.$direction};
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  margin: 0 auto;
`;

export const ButtonBox = styled.div<{
  $buttonWidth: string | undefined;
  $second: boolean;
}>`
  width: ${props => props.$buttonWidth};
  margin: ${props => (props.$second ? 0 : '0 auto')};
`;

export const ValidationError = styled.span`
  position: absolute;
  top: calc(100% + ${theme.space[1]});
  right: 0;
  color: ${({ theme }) => theme.colors.danger.light};
`;

export const DoneIcon = styled.svg<{ $complete?: boolean }>`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  fill: ${props =>
    props.$complete ? theme.colors.success.light : theme.colors.danger.light};
`;

export const SelectBox = styled.div<{ $width: string; disabled: boolean }>`
  width: ${({ $width }) => $width};
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Select = styled.div<{ $open: boolean; $width?: string }>`
  ${baseInputStyles};

  width: ${props => props?.$width};
  min-width: 120px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${p =>
    p.$open &&
    `
    border-color: ${theme.colors.accent.main};
    box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    `}

  &:focus {
    border-color: ${theme.colors.accent.main};
    box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(255, 176, 0, 1);
  }
`;

export const Selected = styled.p`
  font-size: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const LIST_ITEM_HIGHT = '37px';
const LIST_ITEMS_COUNT = 5;

export const SelectList = styled.ul<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + ${theme.space[2]});
  right: 0;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.space[0]};
  box-shadow: ${theme.shadow.m};
  background-color: ${theme.colors.secondary.light};
  border-radius: ${theme.radii.s};
  width: 100%;
  max-height: ${props =>
    props.$open
      ? `calc((${LIST_ITEM_HIGHT} * ${LIST_ITEMS_COUNT}) + (${theme.space[0]} * (${LIST_ITEMS_COUNT} - 1)))`
      : '0'};
  transition: ${theme.transition.primary};
  overflow: auto;
`;

export const SelectListItem = styled.li<{ $selected: boolean }>`
  width: 100%;
  text-align: center;
  padding: ${theme.space[3]};
  color: ${theme.colors.bg.dark};
  transition: ${theme.transition.primary};
  background-color: ${props =>
    props.$selected ? `${theme.colors.secondary.main};` : 'none'};
  outline: none;
  cursor: pointer;
  height: ${LIST_ITEM_HIGHT};

  &::first-letter {
    text-transform: uppercase;
  }

  &:hover {
    background-color: ${theme.colors.secondary.main};
  }

  &:focus-visible {
    background-color: ${theme.colors.secondary.main};
  }
`;

export const SelectIcon = styled.svg<{ $open: boolean }>`
  width: 19px;
  height: 19px;
  fill: ${theme.colors.secondary.dark};
  transition: inherit;

  ${props =>
    props.$open &&
    `
    fill: ${theme.colors.accent.main};
    transform: rotate(180deg);
  `};
`;
