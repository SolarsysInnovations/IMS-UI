import React, { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import DialogBoxUi from '../../components/ui/DialogBox';
import UserForm from './UserForm';
import ActionButtons from '../../components/ui/ActionButtons';
import TableHeader from '../../components/layouts/TableHeader';
import UserDetails from './UserDetaills';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getUserDetails } from '../../api/services';

interface MyCellRendererProps {
  id: number;
}

interface UserData {
  id: string;
  userName: string;
  userEmail: string;
  userMobile: number;
  userRole: string;
}

const MyCellRenderer = ({ id }: MyCellRendererProps) => {
  const queryClient = useQueryClient();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [dialogContent, setDialogContent] = useState<'view' | 'edit' | null>(
    null,
  );
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserDetailsMutation = useMutation({
    mutationFn: getUserDetails,
    onSuccess: (data) => {
      setUserData(data);
      setOpenDialogBox(true);
    },
  });

  const roleDeleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
    },
  });

  const handleViewClick = async () => {
    try {
      setDialogContent('view');
      getUserDetailsMutation.mutate(id.toString());
    } catch (error) {
      console.error('Error in handleViewClick:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      setDialogContent('edit');
      getUserDetailsMutation.mutate(id.toString());
    } catch (error) {
      console.error('Error in handleEditClick:', error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?',
    );
    if (confirmed) {
      roleDeleteMutation.mutate(id.toString());
    }
  };

  const handleCloseDialog = () => {
    setOpenDialogBox(false);
    setDialogContent(null);
  };

  function handleDialogContent(dialogContent: string | null) {
    if (dialogContent === 'view' && userData) {
      return (
        <>
          <TableHeader headerName="User Details" />
          <UserDetails userDetails={userData} />
        </>
      );
    } else if (dialogContent === 'edit' && userData) {
      return (
        <UserForm
          userEditValue={userData}
          mode="edit"
          onClose={handleCloseDialog}
        />
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        onViewClick={handleViewClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        canView={true}
        canEdit={true}
        canDelete={true}
      />

      <DialogBoxUi
        open={openDialogBox}
        content={handleDialogContent(dialogContent)}
        handleClose={handleCloseDialog}
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
      const id = params.row.id;
      return <MyCellRenderer id={id} />;
    },
  },
  {
    field: 'userName',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'userEmail',
    headerName: 'Email',
    width: 150,
    editable: false,
  },
  {
    field: 'userRole',
    headerName: 'Role',
    width: 120,
    editable: false,
  },
];
