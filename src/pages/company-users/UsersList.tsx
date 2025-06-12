import React, { useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import { CircularProgress, Grid } from '@mui/material';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { columns } from './Roles-table-data';
import DialogBoxUi from '../../components/ui/DialogBox';
import UserForm from './UserForm';
import { useRolePermissions } from '../../hooks/useRolePermission';
import { useQuery } from '@tanstack/react-query';
import { getUsersList } from '../../api/services';

const UserList = () => {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['usersList'],
    queryFn: getUsersList,
    staleTime: 5 * 60 * 1000,
  });
  const pathname = usePathname();
  const { canCreateUsers } = useRolePermissions();
  const userList = data ?? [];
  const mode = 'create';

  const buttons = [
    {
      label: 'Create New User',
      icon: Add,
      onClick: () => {
        setOpenDialogBox(true);
      },
    },
  ];

  const resolvedButtons = canCreateUsers ? buttons : [];

  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        height={'100vh'}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <TableHeader headerName={pathname} buttons={resolvedButtons} />
      <GridDataUi
        showToolbar={true}
        columns={columns || []}
        tableData={userList}
        checkboxSelection={false}
      />
      <DialogBoxUi
        open={openDialogBox}
        content={
          <UserForm mode={mode} onClose={() => setOpenDialogBox(false)} />
        }
        handleClose={() => setOpenDialogBox(false)}
      />
    </>
  );
};

export default UserList;
