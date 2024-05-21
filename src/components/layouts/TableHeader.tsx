import { Box, Typography } from '@mui/material';
import React from 'react';
import ButtonSmallUi from '../ui/ButtonSmall';
import { ButtonProps } from '@mui/material/Button';

interface TableHeaderProps {
    headerName?: string;
    buttons?: {
        label: string;
        icon: any;
        onClick: any;
    }[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headerName, buttons }) => {
    return (
        <Box sx={{
            borderRadius: "10px",
            mt: 1,
            mb: 0,
            padding: "8px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Typography variant="subtitle2" color="initial">{headerName}</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
                {buttons?.map((button, index) => (
                    <ButtonSmallUi key={index} variant='contained' label={button.label} onClick={button.onClick} startIcon={<button.icon />} />
                ))}
            </Box>
        </Box>
    )
}

export default TableHeader;
