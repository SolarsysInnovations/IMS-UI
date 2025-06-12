import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import DialogBoxUi from '../../components/ui/DialogBox';
import ServiceCreate from '../../pages/service/service-create-screen';
import ActionButtons from '../../components/ui/ActionButtons';
import { useRolePermissions } from '../../hooks/useRolePermission';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteService } from '../../api/services';

const MyCellRenderer = ({ id }: { id: any }) => {
  const queryClient = useQueryClient();

  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getServiceList'] });
    },
  });

  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { canEditServices, canDeleteServices } = useRolePermissions();

  const handleEditClick = async () => {
    setOpenDialogBox(true);
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service?',
    );
    if (confirmed) {
      deleteServiceMutation.mutate(id);
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
        content={<ServiceCreate setOpenDialogBox={setOpenDialogBox} id={id} />}
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
