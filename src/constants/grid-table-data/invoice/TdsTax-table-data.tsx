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

const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: getTdsTax, error, isLoading, isSuccess: getSuccess, refetch } = useGetTdsTaxQuery();
    const [deleteTdsTax, { isLoading: D_Loading, isSuccess: deleteSuccess }] = useDeleteTdsTaxMutation();

    const handleEditClick = () => {
        localStorage.setItem("service", JSON.stringify(row));
        // navigate(`/invoice/edit/${row.id}`)
    };
    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this gst type?");
        if (confirmed) {
            deleteTdsTax(row.id)
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
export const tdsTaxColumns: GridColDef[] = [

    {
        field: 'taxName',
        headerName: 'tax Name',
        width: 200,
        editable: true,
    },
    {
        field: 'taxPercentage',
        headerName: 'Tax Percentage',
        width: 200,
        editable: false,
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer row={params.row} />,
    },
];