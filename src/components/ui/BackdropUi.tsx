import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface BackDropUiProps {
    open: boolean;
    onClose: () => void;
}
export default function BackDropUi({ open, onClose }: BackDropUiProps) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={onClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
