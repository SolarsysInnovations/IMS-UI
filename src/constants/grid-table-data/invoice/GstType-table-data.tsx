import { IconButton, Stack } from '@mui/material';
import { GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGstType, getSingleGstType } from '../../../api/services';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

const MyCellRenderer = ({ id }: { id: any }) => {
  const queryClient = useQueryClient();
  const context = useTaxConfigContext();

  const getSingleGstTypeMutation = useMutation({
    mutationFn: getSingleGstType,
    onSuccess: (data) => {
      context.setMode('edit');
      context.gstTypeConfig.setGstTypeData({
        id: data.id,
        gstName: data.gstName,
        gstPercentage: data.gstPercentage,
      });
    },
  });

  const deleteGstTypeMutation = useMutation({
    mutationFn: deleteGstType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getGstTypeList'] });
    },
  });

  const handleEditClick = async () => {
    try {
      getSingleGstTypeMutation.mutate(id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this gst type?',
    );
    if (confirmed) {
      deleteGstTypeMutation.mutate(id);
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
export const gstTypeColumns: GridColDef[] = [
  {
    field: 'gstName',
    headerName: 'Gst Name',
    width: 200,
    editable: true,
  },
  {
    field: 'gstPercentage',
    headerName: 'Gst Percentage',
    width: 200,
    editable: false,
  },
  {
    field: 'Action',
    headerName: 'Action',
    width: 140,
    editable: false,
    renderCell: (params: any) => <MyCellRenderer id={params.row?.id} />,
  },
];
