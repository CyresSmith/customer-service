import React from "react";
import { Btn, StyledIcon } from "./Button.styled";

export interface IButton {
    $bgColor?: string,
    color?: string,
    children?: React.ReactNode,
    handleClick?: () => void,
    Icon?: React.ElementType,
    $position?: string,
    $top?: string,
    $right?: string,
    $type?: string
}

const Button = ({$bgColor, children, handleClick, $position, $top, $right, Icon, $type}: IButton) => {
    return (
        <Btn onClick={handleClick} $type={$type} $bgColor={$bgColor} $position={$position} $top={$top} $right={$right}>
            {Icon && <StyledIcon as={Icon} />}
            {children ? children : null}
        </Btn>
    )
};

export default Button;