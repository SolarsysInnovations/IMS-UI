import React, { useEffect, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import { CircularProgress, Grid } from '@mui/material';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useGetUsersListQuery } from '../../redux-store/api/injectedApis';
import { columns } from './Roles-table-data';
import DialogBoxUi from '../../components/ui/DialogBox';
import UserForm from './UserForm';
import { useRolePermissions } from '../../hooks/useRolePermission';

const UserList = () => {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { data, refetch, isLoading } = useGetUsersListQuery();
  const pathname = usePathname();
  const companyUserData = useSelector((state: any) => state.globalState.data);
  const [key, setKey] = useState<number>(0);
  const { canCreateUsers } = useRolePermissions();
  const userList = data ?? [];
  const mode = companyUserData ? 'edit' : 'create';

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [companyUserData]);

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
          <UserForm
            key={key}
            mode={mode}
            userEditValue={companyUserData}
            onClose={() => setOpenDialogBox(false)}
            refetchUserList={refetch}
          />
        }
        handleClose={() => setOpenDialogBox(false)}
      />
    </>
  );
};

export default UserList;
