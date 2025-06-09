import { IconButton, Stack } from '@mui/material';
import { GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deletePaymentTerms,
  getSinglePaymentTerms,
} from '../../../api/services';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

const MyCellRenderer = ({ id }: { id: any }) => {
  const context = useTaxConfigContext();
  const queryClient = useQueryClient();

  const getSinglePaymentTermsMutation = useMutation({
    mutationFn: getSinglePaymentTerms,
    onSuccess: (data) => {
      context.setMode('edit');
      context.paymentTermsConfig.setPaymentTermsData({
        id: data.id,
        termName: data.termName,
        totalDays: data.totalDays,
      });
    },
  });

  const deletePaymentTermsMutation = useMutation({
    mutationFn: deletePaymentTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPaymentTerms'] });
    },
  });

  const handleEditClick = async () => {
    try {
      getSinglePaymentTermsMutation.mutate(id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this gst type?',
    );
    if (confirmed) {
      deletePaymentTermsMutation.mutate(id);
    }
  };

  useSnackbarNotifications({
    error: deletePaymentTermsMutation.isError,
    errorMessage: 'Error updating Payment Terms',
    success: deletePaymentTermsMutation.isSuccess,
    successMessage: 'Payment terms deleted successfully',
  });

  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="" onClick={handleEditClick}>
        <EditIcon
          sx={{ color: `grey.500`, fontSize: '16px' }}
          fontSize="small"
        />
      </IconButton>
      <IconButton aria-label="" onClick={handleDeleteClick}>
        <GridDeleteIcon
          sx={{ color: `grey.500`, fontSize: '16px' }}
          fontSize="small"
        />
      </IconButton>
    </Stack>
  );
};
export const paymentTermsColumns: GridColDef[] = [
  {
    field: 'termName',
    headerName: 'Term Name',
    width: 150,
    editable: false,
  },
  {
    field: 'totalDays',
    headerName: 'Total Days',
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
    renderCell: (params: any) => <MyCellRenderer id={params.row.id} />,
  },
];
