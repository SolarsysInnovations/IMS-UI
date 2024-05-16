import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';

type CustomizedDialogProps = {
    open?: boolean;
    title?: string;
    content?: React.ReactNode;
    actions?: React.ReactNode;
    handleClose?: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DialogBoxUi = ({ open: defaultOpen = false, title, content, actions, handleClose, }: CustomizedDialogProps) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        setOpen(defaultOpen);
    }, [defaultOpen]);

    const handleCloseDialog = () => {
        dispatch(clearData())
        setOpen(false);
        handleClose && handleClose();
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={() => setOpen(true)}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title || "Modal title"}
                </DialogTitle> */}
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 6,
                        top: 3,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ width: "20px" }} />
                </IconButton>
                <DialogContent sx={{ marginTop: "12px" }} >
                    {content}
                </DialogContent>
                {/* <DialogActions>
                    {actions}
                </DialogActions> */}
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default DialogBoxUi;
