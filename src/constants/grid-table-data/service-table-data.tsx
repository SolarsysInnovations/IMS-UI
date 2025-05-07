import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { useEffect, useState } from 'react';
import DialogBoxUi from '../../components/ui/DialogBox';
import {
  useDeleteServiceMutation,
  useGetServiceListQuery,
  useGetSingleServiceMutation,
} from '../../redux-store/api/injectedApis';
import { setServiceData } from '../../redux-store/slices/serviceSlice';
import ServiceCreate from '../../pages/service/service-create-screen';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import ActionButtons from '../../components/ui/ActionButtons';
import { useRolePermissions } from '../../hooks/useRolePermission';

const MyCellRenderer = ({ id }: { id: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { refetch } = useGetServiceListQuery();
  const [
    deletedService,
    {
      error: deleteServiceErrorObject,
      isSuccess: deleteServiceSuccess,
      isError: deleteServiceError,
    },
  ] = useDeleteServiceMutation();
  const [getService] = useGetSingleServiceMutation();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { canEditServices, canDeleteServices } = useRolePermissions();

  useEffect(() => {
    refetch();
  }, [deleteServiceSuccess, refetch]);

  useSnackbarNotifications({
    error: deleteServiceError,
    errorMessage: 'Error adding Service',
    errorObject: deleteServiceErrorObject,
    success: deleteServiceSuccess,
    successMessage: 'Service deleted successfully',
  });

  const handleEditClick = async () => {
    try {
      const response = await getService(id);
      if ('data' in response) {
        const serviceData = response.data;
        dispatch(setServiceData(serviceData));
        setOpenDialogBox(true);
      } else {
        console.error('Error response:', response.error);
      }
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service?',
    );
    if (confirmed) {
      deletedService(id);
    }
  };
  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        canDelete={canDeleteServices}
        canEdit={canEditServices}
      />
      <DialogBoxUi
        open={openDialogBox}
        content={<ServiceCreate setOpenDialogBox={setOpenDialogBox} />}
        handleClose={() => {
          setOpenDialogBox(false);
        }}
      />
    </Stack>
  );
};

export const columns: GridColDef[] = [
  {
    field: 'Action',
    headerName: 'Action',
    width: 140,
    editable: false,
    renderCell: (params: any) => <MyCellRenderer id={params.row?.id} />,
  },
  {
    field: 'serviceAccountingCode',
    headerName: 'Service Code',
    width: 130,
    editable: true,
  },
  {
    field: 'serviceDescription',
    headerName: 'Service Description',
    width: 350,
    editable: false,
  },
  {
    field: 'serviceAmount',
    headerName: 'Service Amount',
    width: 200,
    editable: false,
  },
];
