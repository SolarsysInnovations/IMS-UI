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
import ToastUi from "../components/ui/ToastifyUi";
import { fetchServiceList } from "../redux-store/service/serviceSlice";

const id = 1


const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchServiceList());
    }, [dispatch]);


    const handleEditClick = () => {
        localStorage.setItem("service", JSON.stringify(row));
        console.log(row);
    };

    const handleDeleteClick = () => {
        // dispatch(deleteClient({ row }))
        //     .then(() => {
        //         dispatch(fetchClientList());
        //         toast.info("client deleted successfully", {
        //             position: "top-right",
        //             autoClose: 1000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         })
        //     })
        //     .catch((error) => {
        //         console.error("Error deleting client:", error);
        //         toast.error("Failed to delete client", {
        //             position: "top-right",
        //             autoClose: 1000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         });
        //     });
    };


    return (
        <Stack direction="row" spacing={1}>
            <Link to={`/client-list/edit/${id}`}>
                <IconButton aria-label="" onClick={handleEditClick}>
                    <EditIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
                </IconButton>
            </Link>
            <IconButton aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
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
        field: 'serviceCode',
        headerName: 'serviceCode',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'description',
        width: 450,
        editable: true,
    },
    {
        field: 'amount',
        headerName: 'amount',
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