import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type CustomizedDialogProps = {
  open?: boolean;
  title?: string;
  maxwidth?: any;
  minWidth?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  handleClose?: () => void;
  paperWidth?: string;
  paperMaxWidth?: string;
  paperMinHeight?: string;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DialogBoxUi = ({
  open: defaultOpen = false,
  paperWidth = '800px',
  paperMaxWidth = '600px',
  paperMinHeight = '100px',
  title,
  maxwidth,
  minWidth = '400px',
  content,
  actions,
  handleClose,
}: CustomizedDialogProps) => {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const handleCloseDialog = () => {
    setOpen(false);
    handleClose && handleClose();
  };

  return (
    <BootstrapDialog
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={open}
      PaperProps={{
        sx: {
          width: paperWidth,
          maxWidth: paperMaxWidth,
          minHeight: paperMinHeight,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ width: '20px' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          ...(typeof maxwidth === 'object' ? maxwidth : {}),
          minWidth: '200px',
          minHeight: '100px',
          margin: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {content}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </BootstrapDialog>
  );
};

export default DialogBoxUi;
