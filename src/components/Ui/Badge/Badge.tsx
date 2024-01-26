import { BadgeBox } from './Badge.styled';

type Props = {
  count: number;
};

const Badge = ({ count }: Props) => {
  return <BadgeBox>{count}</BadgeBox>;
};

export default Badge;
