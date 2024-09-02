import { useEffect } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { showSnackbar } from "../redux-store/global/snackBarSlice";
import { AppDispatch } from "../redux-store/store";

interface SnackbarNotificationProps {
    success: any;
    error: boolean;
    successMessage: string;
    errorMessage: string;
    errorObject?: any;
}

export const useSnackbarNotifications = ({ success, error, successMessage, errorMessage, errorObject }: SnackbarNotificationProps) => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (success) {
            dispatch(showSnackbar({ message: successMessage, severity: 'success' }));
        }
        if (error) {
            const errorMessageFinal = errorObject?.data?.message || errorMessage;
            dispatch(showSnackbar({ message: errorMessageFinal, severity: 'error' }));
        }

    }, [dispatch, success, error, successMessage, errorMessage, errorObject])
};