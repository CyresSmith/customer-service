import React from "react";
import { ListItem, ListItemLink, StyledIcon } from "./NavList.styled"

type Props = {
    name: string,
    Icon?: React.ElementType
};

const NavListItem = ({name, Icon}: Props) => {
    return (
        <ListItem>
            <ListItemLink to='#'>
                {Icon && <StyledIcon as={Icon} />}
                {name}
            </ListItemLink>
        </ListItem>
    )
};

export default NavListItem;