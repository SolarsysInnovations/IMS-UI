import { Box, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import CustomerDetails from '../../pages/customer/customerDetails';
import TableHeader from '../../components/layouts/TableHeader';
import DialogBoxUi from '../../components/ui/DialogBox';
import { useRolePermissions } from '../../hooks/useRolePermission';
import ActionButtons from '../../components/ui/ActionButtons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCustomer } from '../../api/services';

const MyCellRenderer = ({ id }: { id: any }) => {
  const queryClient = useQueryClient();
  const [openDialogBox, setOpenDialogBox] = useState(false);

  const deleteCustomerMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCustomerList'] });
    },
  });
  const navigate = useNavigate();

  const { canViewCustomers, canEditCustomers, canDeleteCustomers } =
    useRolePermissions();

  const handleEditClick = async () => {
    navigate(`/customer/edit/${id}`);
  };

  const handleDialogOpen = async () => {
    setOpenDialogBox(true);
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?',
    );
    if (confirmed) {
      deleteCustomerMutation.mutate(id);
    }
  };
  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        id={id}
        canEdit={canEditCustomers}
        canView={canViewCustomers}
        canDelete={canDeleteCustomers}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onViewClick={handleDialogOpen}
      />
      <DialogBoxUi
        paperWidth="900px"
        paperMaxWidth="900px"
        open={openDialogBox}
        content={
          <>
            <TableHeader headerName="Customer Details" />
            <Box sx={{ marginTop: '15px' }}>
              <CustomerDetails id={id} />
            </Box>
          </>
        }
        handleClose={() => setOpenDialogBox(false)}
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
    field: 'customerName',
    headerName: 'Customer Name',
    width: 150,
    editable: true,
  },
  {
    field: 'customerType',
    headerName: 'Customer Type',
    width: 150,
    editable: true,
  },
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 150,
    editable: true,
  },
  {
    field: 'customerEmail',
    headerName: 'Customer Email',
    width: 150,
    editable: true,
  },
  {
    field: 'customerPhone',
    headerName: 'Customer Phone',
    width: 150,
    editable: false,
  },
];
