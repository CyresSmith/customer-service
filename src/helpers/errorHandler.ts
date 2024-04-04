import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const handleError = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  } else if (error instanceof AxiosError) {
    const { response } = error;
    if (response?.status === 401) {
      toast.error('Необхідно авторизуватись');
    } else if (response?.status === 403) {
      toast.error('Введено некоректні дані');
    } else {
      toast.error(response?.data?.message);
    }
    return response?.data?.message;
  } else {
    return 'Unknown error occuped';
  }
};

export default handleError;
