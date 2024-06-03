import Button from 'components/Ui/Buttons/Button';
import { HiMiniArrowUturnLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { Message, PageBox } from './ErrorPage.styled';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <PageBox>
            <Message>Сторінки не існує :(</Message>

            <Button
                onClick={() => navigate(-1)}
                Icon={HiMiniArrowUturnLeft}
                children="Повернутись назад"
                $colors="accent"
            />
        </PageBox>
    );
};

export default ErrorPage;
