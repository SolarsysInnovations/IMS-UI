import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const id = 1
export const columns: GridColDef[] = [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => {

            const onClick = (e: any) => {
                const currentRow = params.row;
                return alert(JSON.stringify(currentRow, null, 4));
            };

            return (
                <Stack direction="row" spacing={1}>
                    <Link to={`/client-list/edit/${id}`} ><IconButton aria-label="" onClick={() => {
                        const currentRow = params.row;
                        localStorage.setItem("client", JSON.stringify(currentRow))
                        return console.log(currentRow);
                    }}>
                        <EditIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
                    </IconButton>
                    </Link>
                    <IconButton aria-label="" onClick={onClick}>
                        <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
                    </IconButton>
                </Stack >
            );
        },

    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'primaryContact',
        headerName: 'primaryContact',
        width: 250,
        editable: true,
    },
    {
        field: 'type',
        headerName: 'type',
        width: 150,
        editable: true,
    },
    {
        field: 'companyName',
        headerName: 'companyName',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'email',
        width: 150,
        editable: true,
    },
    {
        field: 'phoneNumber',
        headerName: 'phoneNumber',
        width: 150,
        editable: true,
    },

    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];