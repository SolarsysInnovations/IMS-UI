import { Button, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { useEffect, useState } from "react";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../../components/ui/ModalUi";
import InvoiceUi from "../../../components/Generate-Invoice/InvoiceUi";
import ButtonSmallUi from "../../../components/ui/ButtonSmall";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { useDeleteInvoiceMutation, useGetInvoiceListQuery, useGetSingleInvoiceMutation, useUpdateCustomerMutation } from "../../../redux-store/api/injectedApis";
import { clearInvoiceData, setInvoiceData } from "../../../redux-store/slices/invoiceSlice";

export const DownloadButtonRenderer = ({ row }: { row: any }) => {
    const [downloadPdf, setDownloadPdf] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceData, setInvoicesData] = useState<any>();

    const handleOpenModal = () => {
        setInvoicesData(row);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ButtonSmallUi
                variant="outlined"
                label="Download Pdf"
                onClick={handleOpenModal}
            />
            <ModalUi topHeight='100%' open={isModalOpen} onClose={handleCloseModal} >
                <InvoiceUi downloadPdf={downloadPdf} invoiceData={invoiceData} />
            </ModalUi>
        </>
    );
};

export const MyCellRenderer = ({ row }: { row: any }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { data: invoice, error, isLoading, refetch: getInvoiceList } = useGetInvoiceListQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceData, setInvoicesData] = useState<any>();
    const [deleteInvoice, { isSuccess: invoiceDeleteSuccess, isError: invoiceDeleteError, error: invoiceDeleteErrorObject }] = useDeleteInvoiceMutation();
    const [getInvoice, { data, isSuccess: getInvoiceSuccess, isError: getInvoiceError, error: getInvoiceErrorObject }] = useGetSingleInvoiceMutation();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);
    const [updateInvoice] = useUpdateCustomerMutation();

    useEffect(() => {
        getInvoiceList()
    }, [invoiceDeleteSuccess]);

    useSnackbarNotifications({
        error: invoiceDeleteError,
        errorMessage: 'Error adding invoice',
        success: invoiceDeleteSuccess,
        successMessage: 'Invoice deleted successfully',
        errorObject: invoiceDeleteErrorObject,
    });

    const handleEditClick = async () => {
        try {
            const response = await getInvoice(row.id);
            if ('data' in response) {
                const invoiceData = response.data;
                console.log("invoiceData", invoiceData);
                await dispatch(setInvoiceData(invoiceData));
                navigate("/invoice/create");
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }

    const handleDetails = async (row: any) => {
        try {
            const response = await getInvoice(row.id);
            if ('data' in response) {
                const invoiceData = response.data;
                console.log("invoiceData", invoiceData);
                dispatch(clearInvoiceData());
                dispatch(setInvoiceData(invoiceData));
                handleOpenModal();
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    };

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this invoice?");
        if (confirmed) {
            deleteInvoice(row.id)
        }
    };
    const handleOpenModal = () => {
        setPreview(true);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Stack direction="row" spacing={1}>
                <IconButton aria-label="" onClick={handleEditClick}>
                    <EditIcon sx={{ color: `grey.500`, fontSize: "16px", '&:hover': { color: 'blue' } }} fontSize='small' />
                </IconButton>
                <IconButton aria-label="" onClick={handleDeleteClick}>
                    <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px", '&:hover': { color: 'blue' } }} fontSize='small' />
                </IconButton>
                <IconButton sx={{ padding: "3px" }} aria-label="" onClick={() => {
                    handleDetails(row)
                    setInvoicesData(row)
                }}>
                    <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
                </IconButton>
                <ModalUi topHeight='100%' open={isModalOpen} onClose={handleCloseModal} >
                    <InvoiceUi preview={preview} invoiceData={invoiceData} isModalOpen={setIsModalOpen} />
                </ModalUi>
            </Stack>
        </>
    );
};
