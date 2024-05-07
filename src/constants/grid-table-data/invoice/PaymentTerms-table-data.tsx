import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import ModalUi from "../../../components/ui/ModalUi";
import InvoiceUi from "../../../components/Generate-Invoice/InvoiceUi";
import { toast } from "react-toastify";
import { toastConfig } from "../../forms/config/toastConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteInvoiceMutation, useGetInvoiceQuery } from "../../../redux-store/invoice/invcoiceApi";
import { AppDispatch } from "../../../redux-store/store";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteTdsTaxMutation, useGetTdsTaxQuery } from "../../../redux-store/invoice/tdsTaxApi";
import { useDeletePaymentTermsMutation, useGetPaymentTermsQuery } from "../../../redux-store/invoice/paymentTerms";

const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: getPaymentTerms, error, isLoading, isSuccess: getSuccess, refetch } = useGetPaymentTermsQuery();
    const [deletePaymentTerms, { isLoading: D_Loading, isSuccess: deleteSuccess }] = useDeletePaymentTermsMutation();

    const handleEditClick = () => {
        localStorage.setItem("service", JSON.stringify(row));
        // navigate(`/invoice/edit/${row.id}`)
    };
    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this gst type?");
        if (confirmed) {
            deletePaymentTerms(row.id)
        }
    };

    useEffect(() => {
        if (deleteSuccess) {
            // toast.success("successfully deleted the gst type", toastConfig)
        }
        refetch();
    }, [deleteSuccess, refetch]);

    return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="" onClick={handleEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
            </IconButton>
            <IconButton aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
            </IconButton>
        </Stack>
    );
};
export const paymentTermsColumns: GridColDef[] = [

    {
        field: 'termName',
        headerName: 'tax Name',
        width: 150,
        editable: true,
    },
    {
        field: 'startDate',
        headerName: 'startDate',
        width: 150,
        editable: false,
    },
    {
        field: 'dueDate',
        headerName: 'dueDate',
        width: 150,
        editable: false,
    },
    {
        field: 'Actions',
        width: 100,
        align: 'right',
        headerName: 'Action',
        // width: 100,
        headerAlign: 'center',
        editable: false,
        renderCell: (params: any) => <MyCellRenderer row={params.row} />,
    },
];