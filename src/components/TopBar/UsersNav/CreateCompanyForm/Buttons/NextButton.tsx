import Button from 'components/Ui/Buttons/Button';
import { IButton } from 'components/Ui/Buttons/Button/Button.types';
import { HiArrowSmRight } from 'react-icons/hi';

const NextButton = (props: IButton) => {
    return (
        <Button id="next" $iconPosition="r" Icon={HiArrowSmRight} $colors="accent" {...props}>
            Далі
        </Button>
    );
};

export default NextButton;
