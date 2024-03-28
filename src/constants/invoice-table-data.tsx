import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux-store/store";
import { useEffect } from "react";
import { useGetInvoiceQuery } from "../redux-store/invoice/invcoiceApi";

const id = 1

const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: invoice, error, isLoading, refetch } = useGetInvoiceQuery();

    console.log(invoice);

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
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer row={params.row} />,
    },

    {
        field: 'invoiceType',
        headerName: 'Invoice Type',
        width: 150,
        editable: true,
    },
    {
        field: 'invoiceNumber',
        headerName: 'Invoice Number',
        width: 150,
        editable: true,
    },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 150,
        editable: false,
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        width: 150,
        editable: false,
    },
    {
        field: 'invoiceStatus',
        headerName: 'Invoice Status',
        width: 150,
        editable: false,
    },
    {
        field: 'gstPercentage',
        headerName: 'Gst Percentage',
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