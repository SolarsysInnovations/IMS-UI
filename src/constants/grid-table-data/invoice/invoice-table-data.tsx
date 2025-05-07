import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { useEffect, useState } from 'react';
import InvoiceUi from '../../../pages/Invoice/Generate-Invoice/InvoiceUi';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import {
  useDeleteInvoiceMutation,
  useGetInvoiceListQuery,
  useGetSingleInvoiceMutation,
} from '../../../redux-store/api/injectedApis';
import {
  clearInvoiceData,
  setInvoiceData,
} from '../../../redux-store/slices/invoiceSlice';
import DialogBoxUi from '../../../components/ui/DialogBox';
import ActionButtons from '../../../components/ui/ActionButtons';
import { useRolePermissions } from '../../../hooks/useRolePermission';

export const MyCellRenderer = ({ row }: { row: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { refetch: getInvoiceList } = useGetInvoiceListQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const [
    deleteInvoice,
    {
      isSuccess: invoiceDeleteSuccess,
      isError: invoiceDeleteError,
      error: invoiceDeleteErrorObject,
    },
  ] = useDeleteInvoiceMutation();
  const [getInvoice] = useGetSingleInvoiceMutation();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);

  const { canEditInvoices, canViewInvoices, canDeleteInvoices } =
    useRolePermissions();

  useEffect(() => {
    getInvoiceList();
  }, [invoiceDeleteSuccess]);

  useSnackbarNotifications({
    error: invoiceDeleteError,
    errorMessage: 'Error deleting invoice',
    success: invoiceDeleteSuccess,
    successMessage: 'Invoice deleted successfully',
    errorObject: invoiceDeleteErrorObject,
  });

  const handleEditClick = async () => {
    if (row.invoiceStatus === 'PENDING') {
      alert('Editing is not allowed when the invoice status is PENDING.');
      return;
    }

    try {
      const response = await getInvoice(row.id);
      if ('data' in response) {
        const invoiceData = response.data;
        dispatch(setInvoiceData(invoiceData));
        navigate('/invoice/create');
      } else {
        console.error('Error response:', response.error);
      }
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };

  const handleDetails = async () => {
    try {
      const response = await getInvoice(row.id);
      if ('data' in response) {
        const invoiceData = response.data;
        dispatch(clearInvoiceData());
        dispatch(setInvoiceData(invoiceData));
        handleOpenModal();
        setIsModalOpen(true);
      } else {
        console.error('Error response:', response.error);
      }
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this invoice?',
    );
    if (confirmed) {
      deleteInvoice(row.id);
    }
  };

  const handleOpenModal = () => {
    setPreview(true);
  };

  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        canView={canViewInvoices}
        canDelete={canDeleteInvoices}
        canEdit={canEditInvoices && row.invoiceStatus !== 'PENDING'}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onViewClick={handleDetails}
      />
      <DialogBoxUi
        open={isModalOpen}
        content={<InvoiceUi preview={preview} />}
        handleClose={() => {
          setIsModalOpen(false);
        }}
      />
    </Stack>
  );
};
