import { Container } from 'components/HomeContent/HomeContent.styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyQuery } from 'store/users/authApi';

const Verify = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const { data, error, isError, isSuccess, isLoading } = useVerifyQuery(code);

  useEffect(() => {
    if (isLoading) {
      setMessage('Loading...');
    }

    if (isSuccess) {
      console.log('data: ', data);

      setMessage('User successfully verified!');

      //   navigate('/');
    }

    if (isError) {
      console.log(error);
      setMessage('Verification error');
    }
  }, [data, error, isError, isLoading, isSuccess, navigate]);

  return (
    <Container>
      <a href=""></a>
      {message.length && <h1>{message}</h1>}
    </Container>
  );
};

export default Verify;
