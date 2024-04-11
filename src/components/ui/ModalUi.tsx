import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
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
    topHeight?: string;
}

export default function ModalUi({ topHeight, children, open, onClose }: ModalUiProps) {
    return (
        <div>
            <Modal
                sx={{
                    overflow: "scroll",
                }}
                keepMounted
                open={open}
                onClose={onClose} // Use onClose prop for handling modal close
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={{

                    position: 'absolute' as 'absolute',
                    top: `${topHeight || "50%"}`,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "50%",
                    bgcolor: 'background.paper',
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                }}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
