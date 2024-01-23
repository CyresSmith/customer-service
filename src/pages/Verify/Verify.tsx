import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const { code } = useParams();

  useEffect(() => {
    if (code) {
      console.log(code);
    }
  }, [code]);

  return <div>Verify</div>;
};

export default Verify;
