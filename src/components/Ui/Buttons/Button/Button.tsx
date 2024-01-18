import { Btn } from "./Button.styled";

export interface IButton {
    bgColor?: string,
    color?: string,
    children?: string,
    handleClick?: () => void,
    icon?: string;
    $position?: string,
    $top?: string,
    $right?: string,
}

const Button = ({bgColor, children, handleClick}: IButton) => {
    return (
        <Btn onClick={handleClick} bgColor={bgColor}>
            {children}
        </Btn>
    )
};

export default Button;