import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    overflow: "scroll",
    position: 'absolute' as 'absolute',
    top: '10%',
    left: '20%',
    // transform: 'translate(-50%, -50%)',
    width: "55%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface NestedModalUiProps {
    open: boolean;
    handleClose: () => void;
    children?: React.ReactNode;
}

const NestedModalUi: React.FC<NestedModalUiProps> = ({ open, handleClose, children }) => {
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={{ ...style, }}>
                {children}
            </Box>
        </Modal>
    );
};

export default NestedModalUi;
