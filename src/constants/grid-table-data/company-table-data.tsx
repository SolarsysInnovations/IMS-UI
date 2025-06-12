import { Box, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import CompanyDetails from '../../pages/super-admin-company/companyDetailsScreen';
import TableHeader from '../../components/layouts/TableHeader';
import DialogBoxUi from '../../components/ui/DialogBox';
import ActionButtons from '../../components/ui/ActionButtons';
import { useRolePermissions } from '../../hooks/useRolePermission';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompany, getSingleCompany } from '../../api/services';

const MyCellRenderer = ({ id }: { id: any }) => {
  const queryClient = useQueryClient();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const navigate = useNavigate();
  const { canEditCompanies, canViewCompanies, canDeleteCompanies } =
    useRolePermissions();

  const getSingleCompanyMutation = useMutation({
    mutationFn: getSingleCompany,
    onSuccess: (data) => {
      setCompanyData(data);
      setOpenDialogBox(true);
    },
  });

  const deleteCompanyMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCompanyList'] });
    },
  });

  const handleDialogOpen = async () => {
    getSingleCompanyMutation.mutate(id);
  };

  const handleEditClick = async () => {
    navigate(`/company/edit/${id}`);
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this company?',
    );
    if (confirmed) {
      deleteCompanyMutation.mutate(id);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onViewClick={handleDialogOpen}
        canView={canViewCompanies}
        canDelete={canDeleteCompanies}
        canEdit={canEditCompanies}
      />

      <DialogBoxUi
        paperWidth="900px"
        paperMaxWidth="900px"
        open={openDialogBox}
        content={
          <>
            <TableHeader headerName="Company Details" />
            <Box sx={{ marginTop: '15px' }}>
              <CompanyDetails details={companyData ?? []} />
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
    renderCell: (params: any) => {
      const userId = params.row.id;
      return <MyCellRenderer id={userId} />;
    },
  },
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 150,
    editable: true,
  },
  {
    field: 'userName',
    headerName: 'User Name',
    width: 150,
    editable: false,
  },
  {
    field: 'userRole',
    headerName: 'User Role',
    width: 150,
    editable: false,
  },
];
