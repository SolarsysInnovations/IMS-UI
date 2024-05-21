import React, { useEffect } from "react";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { Box, IconButton, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Add, RemoveRedEyeOutlined } from "@mui/icons-material";



const MyCellRenderer = ({ id, contactPersons }: any) => {

    return (
        <Stack direction="row" spacing={1}>
            <IconButton sx={{ padding: "3px" }} aria-label=""  >
                <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label=""  >
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" >
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
        </Stack>
    );
};


export const columns: GridColDef[] = [
    {
        field: 'userName',
        headerName: 'User Name',
        width: 150,
        editable: true,
    },
    {
        field: 'userRole',
        headerName: 'User Role',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
    },
    {
        field: 'access',
        headerName: 'Access',
        width: 150,
        editable: true,
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer id={params.row?.id} />,
    },
];