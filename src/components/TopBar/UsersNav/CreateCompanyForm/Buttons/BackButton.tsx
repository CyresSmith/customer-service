import Button from 'components/Ui/Buttons/Button';
import { IButton } from 'components/Ui/Buttons/Button/Button.types';
import { HiArrowSmLeft } from 'react-icons/hi';

const BackButton = (props: IButton) => {
  return (
    <Button $iconPosition="l" Icon={HiArrowSmLeft} $colors="light" {...props}>
      Назад
    </Button>
  );
};

export default BackButton;
