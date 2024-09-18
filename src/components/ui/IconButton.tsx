import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/system';

interface StyledIconButtonProps extends IconButtonProps {
    disabled?: boolean;
}

const StyledIconButton = styled((props: StyledIconButtonProps) => <IconButton {...props} />)(({ theme }) => ({
    padding: '3px',
    '&.Mui-disabled': {
        color: theme.palette.grey[500],
        cursor: 'not-allowed',
        pointerEvents: 'auto',
    },
}));

export default StyledIconButton;
