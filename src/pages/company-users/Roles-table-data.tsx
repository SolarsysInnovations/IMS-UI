import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { setRoleData } from '../../redux-store/role/roleApi';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import DialogBoxUi from '../../components/ui/DialogBox';
import {
  useDeleteUserMutation,
  useGetUserRoleMutation,
  useGetUsersListQuery,
} from '../../redux-store/api/injectedApis';
import UserForm from './UserForm';
import ActionButtons from '../../components/ui/ActionButtons';
import TableHeader from '../../components/layouts/TableHeader';
import UserDetails from './UserDetaills';

interface MyCellRendererProps {
  id: number;
}
interface UserData {
  id: string;
  userName: string;
  userEmail: string;
  userMobile: number;
  userRole: string;

  // Add other fields as necessary
}

const MyCellRenderer = ({ id }: MyCellRendererProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [dialogContent, setDialogContent] = useState<'view' | 'edit' | null>(
    null,
  );
  const [userData, setUserData] = useState<UserData | null | undefined | void>(
    null,
  );
  const { refetch } = useGetUsersListQuery();

  const [getUserRole, { data: roleData, isSuccess: C_success }] =
    useGetUserRoleMutation();
  const [
    deleteUser,
    { isSuccess: roleDeleteSuccess, isError: roleDeleteError },
  ] = useDeleteUserMutation();

  useSnackbarNotifications({
    success: roleDeleteSuccess,
    error: roleDeleteError,
    successMessage: 'User deleted successfully',
    errorMessage: 'Error deleting user',
  });
  useEffect(() => {
    refetch();
  }, [roleDeleteSuccess, refetch]);

  useEffect(() => {
    dispatch(setRoleData(roleData));
  }, [roleData, dispatch, C_success]);
  const handleViewClick = async () => {
    try {
      const response = await getUserRole(id.toString());
      if ('data' in response) {
        setUserData(response.data); // Ensures data is defined
        dispatch(setRoleData(response.data));
        setDialogContent('view');
        setOpenDialogBox(true);
      } else {
        console.error('Error fetching user data: No data found in response');
      }
    } catch (error) {
      console.error('Error in handleViewClick:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      const response = await getUserRole(id.toString());
      if ('data' in response) {
        setUserData(response.data); // Ensures data is defined
        dispatch(setRoleData(response.data));
        setDialogContent('edit');
        setOpenDialogBox(true);
      } else {
        console.error('Error fetching user data: No data found in response');
      }
    } catch (error) {
      console.error('Error in handleEditClick:', error);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?',
    );
    if (confirmed) {
      deleteUser(id);
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
          refetchUserList={refetch}
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
