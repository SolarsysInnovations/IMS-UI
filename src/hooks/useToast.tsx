import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { toastConfig } from '../constants/forms/config/toastConfig';
import { useNavigate } from 'react-router-dom';

interface SuccessToastParams {
    isSuccess: boolean;
    message: string;
    refetch?: () => void;
    navigate?: () => void;
}

const useSuccessToast = ({ isSuccess, message, refetch, navigate }: SuccessToastParams) => {
    const refetchCalled = useRef(false);
    const nav = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success(message, toastConfig);
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
    }, [isSuccess, message, refetch, navigate]);
};

export default useSuccessToast;
