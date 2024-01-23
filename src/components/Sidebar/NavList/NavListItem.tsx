import React from 'react';
import { ListItemLink, StyledIcon } from './NavList.styled';

type Props = {
  name: string;
  Icon?: React.ElementType;
};

const NavListItem = ({ name, Icon }: Props) => {
  return (
    <li>
      <ListItemLink to="#">
        {Icon && <StyledIcon as={Icon} />}
        <span>{name}</span>
      </ListItemLink>
    </li>
  );
};

export default NavListItem;
