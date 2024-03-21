import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

interface ModalUiProps {
    children?: React.ReactNode;
    open: boolean;
    onClose?: () => void;
}

export default function ModalUi({ children, open, onClose }: ModalUiProps) {
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={onClose} // Use onClose prop for handling modal close
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
