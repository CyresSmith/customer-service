import styled from 'styled-components';
import theme from 'utils/theme';

export const baseInputStyles = `
  color: ${theme.colors.bg.dark};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.radii.m};
  background-color: ${theme.colors.secondary.light};
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
    display: flex;
    position: relative;
    flex-direction: column;
    gap: ${theme.space[1]};
    width: 100%;
`;

export const FormInputLabel = styled.label`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

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
    fill: ${({ hidden }) => (hidden ? theme.colors.secondary.main : theme.colors.secondary.dark)};
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
    fill: ${props => (props.$complete ? theme.colors.success.light : theme.colors.danger.light)};
`;

export const SelectBox = styled.div<{ $width: string; disabled: boolean }>`
    width: ${({ $width }) => $width};
    position: relative;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

type Colors = 'dark' | 'light';

export const Select = styled.div<{ $open: boolean; $width?: string; $colors: Colors }>`
    ${baseInputStyles};

    color: ${({ $colors }) =>
        $colors === 'light' ? theme.colors.bg.dark : theme.colors.accent.light};
    background-color: ${({ $colors }) =>
        $colors === 'light' ? theme.colors.secondary.light : theme.colors.bg.dark};
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

    > svg {
        fill: ${({ $colors }) =>
            $colors === 'light' ? theme.colors.bg.dark : theme.colors.accent.light};
    }

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
const LIST_PADDING = theme.space[2];
const LIST_GAP = theme.space[1];

export const SelectList = styled.ul<{
    $open: boolean;
    $itemsCount: number;
    $visibleItemsCount: number;
    $colors: Colors;
}>`
    position: absolute;
    top: calc(100% + ${theme.space[2]});
    right: 0;
    z-index: 102;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${LIST_GAP};
    box-shadow: ${theme.shadow.m};
    background-color: ${({ $colors }) =>
        $colors === 'light' ? theme.colors.secondary.light : theme.colors.bg.dark};
    border-radius: ${theme.radii.m};
    width: 100%;
    height: ${({ $itemsCount, $open }) =>
        $open
            ? `calc((${LIST_ITEM_HIGHT} * ${$itemsCount}) + (${LIST_GAP} * (${$itemsCount} - 1) + (${LIST_PADDING} * 2)))`
            : '0'};
    max-height: ${({ $visibleItemsCount }) => `calc(
        (
            (${LIST_ITEM_HIGHT} * ${$visibleItemsCount}) +
                (${LIST_GAP} * (${$visibleItemsCount} - 1) + (${LIST_PADDING} * 2))
        )
    )`};
    transition: ${theme.transition.primary};
    overflow-y: scroll;
    overflow-x: hidden;
    padding: ${({ $open }) => ($open ? LIST_PADDING : 0)};
`;

export const SelectListItem = styled.li<{ $selected: boolean; $colors: Colors }>`
    width: 100%;
    color: ${({ $selected, $colors }) =>
        $selected
            ? $colors === 'light'
                ? theme.colors.primary.light
                : theme.colors.bg.dark
            : $colors === 'light'
            ? theme.colors.bg.dark
            : theme.colors.secondary.light};
    transition: ${theme.transition.primary};
    background-color: ${({ $selected, $colors }) =>
        $selected
            ? $colors === 'light'
                ? theme.colors.bg.main
                : theme.colors.accent.light
            : 'transparent'};

    border-radius: ${theme.radii.s};
    outline: none;
    cursor: pointer;
    min-height: ${LIST_ITEM_HIGHT};
    max-height: ${LIST_ITEM_HIGHT};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: ${theme.space[2]};
    text-align: center;
    align-content: center;

    &::first-letter {
        text-transform: uppercase;
    }

    &:hover {
        background-color: ${({ $selected }) =>
            $selected ? theme.colors.primary.dark : theme.colors.primary.light};
    }

    &:focus-visible {
        background-color: ${theme.colors.secondary.main};
    }
`;

export const SelectIcon = styled.svg<{ $open: boolean }>`
    width: 19px;
    height: 19px;
    transition: inherit;

    ${({ $open }) => $open && `transform: rotate(90deg);`};
`;
