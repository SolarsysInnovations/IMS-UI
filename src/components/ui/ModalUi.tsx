import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

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
                BackdropProps={{ onClick: (e) => e.stopPropagation() }}
            >
                <Box sx={{

                    position: 'absolute' as 'absolute',
                    top: `${"10%"}`,
                    left: '25%',

                    width: "30%",
                    bgcolor: 'background.paper',
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 6,
                }}>
                    <Button onClick={onClose} sx={{ position: 'absolute', top: '10px', right: '10px' }}> <CloseIcon sx={{ width: "15px" }} /></Button>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
