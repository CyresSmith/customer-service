import Button from 'components/Ui/Buttons/Button';
import { useAdminRights } from 'hooks';
import { HiPlusCircle } from 'react-icons/hi';

type Props = {
  handleModalOpen: () => void;
};

const ServicesBar = ({ handleModalOpen }: Props) => {
  const isAdmin = useAdminRights();

  return (
    <>
      {isAdmin && (
        <Button onClick={handleModalOpen} Icon={HiPlusCircle} $colors="light">
          Додати послугу
        </Button>
      )}
    </>
  );
};

export default ServicesBar;
