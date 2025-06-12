import React, { useCallback, useState } from 'react';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useRolePermissions } from '../../hooks/useRolePermission';
import ActionButtons from '../../components/ui/ActionButtons';
import DialogBoxUi from '../../components/ui/DialogBox';
import InvoiceUi from '../../pages/Invoice/Generate-Invoice/InvoiceUi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInvoice, getSingleInvoice } from '../../api/services';

interface MyCellRendererProps {
  row: any;
}

export const MyCellRenderer: React.FC<MyCellRendererProps> = ({ row }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { canEditInvoices, canViewInvoices, canDeleteInvoices } =
    useRolePermissions();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const getSingleInvoiceMutation = useMutation({
    mutationFn: getSingleInvoice,
    onSuccess: (data) => {
      setInvoiceData(data);
      setIsModalOpen(true);
    },
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'getInvoiceList',
      });
    },
  });

  const handleEditClick = useCallback(async () => {
    if (row.invoiceStatus === 'PENDING') {
      alert('Editing is not allowed when the invoice status is PENDING.');
      return;
    }
    navigate(`/invoice/edit/${row.id}`);
  }, [row]);

  const handleDetails = useCallback(async () => {
    try {
      getSingleInvoiceMutation.mutate(row.id);
    } catch (error) {
      console.error('Error handling details click:', error);
    }
  }, [row]);

  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this invoice?',
    );
    if (confirmed) {
      try {
        deleteInvoiceMutation.mutate(row.id);
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        canView={canViewInvoices}
        canDelete={canDeleteInvoices && row.invoiceStatus !== 'PENDING'}
        canEdit={canEditInvoices && row.invoiceStatus !== 'PENDING'}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onViewClick={handleDetails}
      />

      <DialogBoxUi
        open={isModalOpen}
        content={
          <InvoiceUi
            invoiceData={invoiceData}
            setIsModalOpen={setIsModalOpen}
          />
        }
        handleClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
};
