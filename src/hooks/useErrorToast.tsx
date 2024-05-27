import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { toastConfig } from '../constants/forms/config/toastConfig';
import { useNavigate } from 'react-router-dom';

interface ErrorToastParams {
    isError: boolean;
    message: string;
    refetch?: () => void;
    navigate?: () => void;
}

const useErrorToast = ({ isError, message, refetch, navigate }: ErrorToastParams) => {
    const refetchCalled = useRef(false);
    const nav = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message, toastConfig);
            if (refetch && !refetchCalled.current) {
                refetchCalled.current = true;
                refetch();
            }
            if (navigate) {
                setTimeout(() => {
                    navigate();
                }, toastConfig.autoClose);
            }
        }
    }, [isError, message, refetch, navigate]);
};

export default useErrorToast;
