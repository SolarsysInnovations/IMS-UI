import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export interface SnackBarUiProps {
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    autoHideDuration?: number;
    isSubmitting?: boolean; // Add a prop to indicate whether form is submitting
}

const SnackBarUi: React.FC<SnackBarUiProps> = ({
    message,
    severity,
    autoHideDuration = 3000,
    isSubmitting
}) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (isSubmitting) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [isSubmitting]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackBarUi;
