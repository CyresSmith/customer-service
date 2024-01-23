import { AxiosError } from "axios";

const handleError = (error: unknown): string => {
    if (typeof error === 'string') {
        return error;
    } else if (error instanceof AxiosError) {
        const {response} = error;
        return response?.data?.message;
    } else {
        return 'Unknown error occuped'
    }
};

export default handleError;