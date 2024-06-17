import { ReactNode } from 'react';
import { BadgeBox, BadgeStyle, BadgeWrapper } from './Badge.styled';

type Props = {
    count?: number;
    style?: BadgeStyle;
    children: ReactNode;
    show?: boolean;
};

const Badge = ({ count, children, style = 'danger', show = true }: Props) => {
    return (
        <BadgeWrapper>
            {show && (
                <BadgeBox $style={style}>{count && count > 0 && <span>{count}</span>}</BadgeBox>
            )}
            {children}
        </BadgeWrapper>
    );
};

export default Badge;
