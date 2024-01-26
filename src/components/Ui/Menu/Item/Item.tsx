import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChildrenBox, ItemBox, ItemChevron, ItemLink } from './Item.styled';

import { HiChevronDown } from 'react-icons/hi';

interface MenuLink {
  id: string | number;
  label: string;
  to: string;
}

export interface MenuItem extends MenuLink {
  children?: MenuItem[] | [];
}

const Item = ({ label, to, children }: MenuItem) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    if (!children) return;

    setIsOpen(p => !p);
  };

  return (
    <>
      <ItemBox $isOpen={isOpen}>
        <ItemLink
          to={to}
          as={children && children.length > 0 ? 'button' : NavLink}
          onClick={handleItemClick}
        >
          <span>
            {label}
            {children && children.length > 0 && `: ${children?.length}`}
          </span>

          {children && children.length > 0 && (
            <ItemChevron as={HiChevronDown} $isOpen={isOpen} />
          )}
        </ItemLink>
      </ItemBox>

      {children && children.length > 0 && (
        <ChildrenBox $isOpen={isOpen}>
          <ul>
            {children.map(item => (
              <Item key={item.id} {...item} />
            ))}
          </ul>
        </ChildrenBox>
      )}
    </>
  );
};

export default Item;
