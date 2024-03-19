import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux-store/store";
import { useEffect } from "react";
import { fetchClientList } from "../redux-store/client/fetchClientList";
import { deleteClient } from "../redux-store/client/deleteClient";
import { toast } from "react-toastify";
import { RemoveRedEyeOutlined } from "@mui/icons-material";

const id = 1


const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchClientList());
    }, [dispatch]);


    const handleEditClick = () => {
        localStorage.setItem("client", JSON.stringify(row));
        console.log(row);
    };

    const handleDeleteClick = () => {
        dispatch(deleteClient({ row }))
            .then(() => {
                dispatch(fetchClientList());
                toast.info("client deleted successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            })
            .catch((error) => {
                console.error("Error deleting client:", error);
                toast.error("Failed to delete client", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
    };

    return (
        <Stack direction="row" spacing={1}>
            <Link to={`/client-list/edit/${id}`}>
                <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleEditClick}>
                    <EditIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
                </IconButton>
            </Link>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={handleDeleteClick}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
        </Stack>
    );
};

export const columns: GridColDef[] = [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer row={params.row} />,

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
        field: 'customerEmail',
        headerName: 'customerEmail',
        width: 150,
        editable: true,
    },
    {
        field: 'phoneNumber',
        headerName: 'phoneNumber',
        width: 150,
        editable: false,
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