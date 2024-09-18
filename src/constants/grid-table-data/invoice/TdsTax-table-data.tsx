import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridValueSetterParams } from "@mui/x-data-grid";
import ModalUi from "../../../components/ui/ModalUi";
import InvoiceUi from "../../../pages/Invoice/Generate-Invoice/InvoiceUi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux-store/store";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { useDeleteTdsTaxMutation, useGetSingleTdsTaxMutation, useGetTdsTaxListQuery } from "../../../redux-store/api/injectedApis";
import { setTdsTaxData } from "../../../redux-store/slices/tdsSlice";


const MyCellRenderer = ({ id }: { id: any, }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { data: getTdsTax, refetch } = useGetTdsTaxListQuery();
    const [getPaymentTerm, { }] = useGetSingleTdsTaxMutation();
    const [deleteTdsTax, { isLoading: tdsTaxDeleteLoading, isSuccess: tdsTaxDeleteSuccess, isError: tdsTaxDeleteError, error: tdsTaxDeleteErrorObject }] = useDeleteTdsTaxMutation();

    const handleEditClick = async () => {
        try {
            const response = await getPaymentTerm(id);
            if (response && 'data' in response) {
                const gstTypeData = response.data;
                dispatch(setTdsTaxData(gstTypeData));
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useSnackbarNotifications({
        error: tdsTaxDeleteError,
        errorObject: tdsTaxDeleteErrorObject,
        errorMessage: 'Error updating TdsTax',
        success: tdsTaxDeleteSuccess,
        successMessage: 'TdsTax update successfully',
    });

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this gst type?");
        if (confirmed) {
            deleteTdsTax(id)
        }
    };

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
        renderCell: (params: any) => <MyCellRenderer id={params.row.id} />,
    },
];