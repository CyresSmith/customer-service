import { Btn, StyledIcon } from "./IconButton.styled";
import { IButton } from "../Button/Button";
import { IoMdClose } from "react-icons/io";

const IconButton = ({handleClick, $position, $top, $right, icon}: IButton) => {
    return (
        <Btn onClick={handleClick} $position={$position} $top={$top} $right={$right}>
            {/* <StyledIcon as={
                icon === 'close' ? IoMdClose :
                null
            }/> */}
        </Btn>
    )
};

export default IconButton;
