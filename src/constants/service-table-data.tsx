import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux-store/store";
import { useEffect } from "react";
import { useGetServiceQuery } from "../redux-store/service/serviceApi";

const id = 1
const MyCellRenderer = ({ row }: { row: any }) => {
    const { data: serviceList, error, isLoading, refetch } = useGetServiceQuery()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        refetch()
    }, [dispatch, refetch]);


    const handleEditClick = () => {
        localStorage.setItem("service", JSON.stringify(row));
        console.log(row);
    };

    const handleDeleteClick = () => {

    };


    return (
        <Stack direction="row" spacing={1}>
            <Link to={`/service-list/edit/${id}`}>
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
    // {
    //     field: 'Action',
    //     headerName: 'Action',
    //     width: 140,
    //     editable: false,
    //     renderCell: (params: any) => <MyCellRenderer row={params.row} />,
    // },
    // { field: 'id', headerName: 'ID', width: 90, },
    {
        field: 'serviceAccountingCode',
        headerName: 'Service Code',
        width: 200,
        editable: true,
    },
    // {
    //     field: 'serviceDescription',
    //     headerName: 'Description',
    //     width: 450,
    //     editable: true,
    // },
    {
        field: 'serviceAmount',
        headerName: 'Service Amount',
        width: 200,
        editable: false,
    },
    {
        field: 'qty',
        headerName: 'Qty',
        width: 150,
        editable: true,
        valueGetter: (params: any) => params.value || 0,
        valueSetter: (params: GridValueSetterParams) => {
            let newValue = params.value; // New value entered by the user
            let row = { ...params.row }; // Copy the row object

            // Update the qty field in the row object
            row.qty = newValue;
            console.log(row.qty);
            // Return the updated row object
            return row;
        }
    },
    {
        field: 'totalAmount',
        headerName: 'Total Amount',
        width: 150,
        editable: false,
        valueGetter: (params: any) => params.value || 0,
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