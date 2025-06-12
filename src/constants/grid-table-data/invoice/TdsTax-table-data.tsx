import { IconButton, Stack } from '@mui/material';
import { GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTdsTax, getSingleTdsTax } from '../../../api/services';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

const MyCellRenderer = ({ id }: { id: any }) => {
  const context = useTaxConfigContext();
  const queryClient = useQueryClient();

  const getSingleTdsTaxMutation = useMutation({
    mutationFn: getSingleTdsTax,
    onSuccess: (data) => {
      context.setMode('edit');
      context.tdsTaxConfig.setTdsTaxData({
        id: data.id,
        taxName: data.taxName,
        taxPercentage: data.taxPercentage,
      });
    },
  });

  const deleteTdsTaxMuation = useMutation({
    mutationFn: deleteTdsTax,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTdsTaxList'] });
    },
  });

  const handleEditClick = async () => {
    try {
      getSingleTdsTaxMutation.mutate(id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this gst type?',
    );
    if (confirmed) {
      deleteTdsTaxMuation.mutate(id);
    }
  };

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
