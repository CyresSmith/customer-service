import { Container } from 'components/Home/HomeContent/HomeContent.styled';
import { useActions } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useVerifyQuery } from 'services/auth.api';
import { Message } from './Verify.styled';

const Verify = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const { logIn, setLoading } = useActions();

    const [message, setMessage] = useState('');

    const { data, error, isError, isSuccess, isLoading } = useVerifyQuery(code);

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        }

        if (isSuccess) {
            if (data) {
                setLoading(false);
                setMessage('User successfully verified!');
                logIn(data);

                toast.success(`Вітаю, ${data.user?.firstName}`);

                const redirectTimeout = setTimeout(() => {
                    navigate('/', { replace: true });
                }, 3000);

                return () => clearTimeout(redirectTimeout);
            }
        }

        if (isError) {
            setLoading(false);
            setMessage(typeof error === 'string' ? error : 'Verification error!');

            const redirectTimeout = setTimeout(() => {
                navigate('/', { replace: true });
            }, 3000);

            return () => clearTimeout(redirectTimeout);
        }
    }, [data, error, isError, isLoading, isSuccess, logIn, navigate, setLoading]);

    return <Container>{message && <Message>{message}</Message>}</Container>;
};

export default Verify;
