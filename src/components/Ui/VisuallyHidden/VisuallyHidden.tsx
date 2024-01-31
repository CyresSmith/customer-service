import { ReactNode } from 'react';
import { Box } from './VisuallyHidden.styled';

type Props = {
  children: ReactNode;
};

const VisuallyHidden = ({ children }: Props) => {
  return <Box>{children}</Box>;
};

export default VisuallyHidden;
