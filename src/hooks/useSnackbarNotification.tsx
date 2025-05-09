import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux-store/global/snackBarSlice';
import { AppDispatch } from '../redux-store/store';

// Better define types for success and error messages
interface SnackbarNotificationProps {
  success: boolean;
  error: boolean;
  successMessage: string;
  errorMessage: string;
  errorObject?: { data: { message: string } }; // Assuming structure based on your usage
}

export const useSnackbarNotifications = ({
  success,
  error,
  successMessage,
  errorMessage,
  errorObject,
}: SnackbarNotificationProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (success) {
      dispatch(showSnackbar({ message: successMessage, severity: 'success' }));
    }
    if (error) {
      const finalErrorMessage = errorObject?.data?.message || errorMessage;
      dispatch(showSnackbar({ message: finalErrorMessage, severity: 'error' }));
    }
  }, [dispatch, success, error, successMessage, errorMessage, errorObject]); // Ensure correct dependencies
};
