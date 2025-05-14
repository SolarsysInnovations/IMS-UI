import React, { useMemo, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import { Box, Typography } from '@mui/material';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { columns } from '../../constants/grid-table-data/service-table-data';
import ServiceCreate from './service-create-screen';
import { useGetServiceListQuery } from '../../redux-store/api/injectedApis';
import DialogBoxUi from '../../components/ui/DialogBox';
import { clearServiceData } from '../../redux-store/slices/serviceSlice';
import { useRolePermissions } from '../../hooks/useRolePermission';

const ServicesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data = [], isLoading, refetch } = useGetServiceListQuery();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { canCreateServices } = useRolePermissions();
  const pathname = usePathname();

  const buttons = useMemo(
    () => [
      {
        label: 'Create Service List',
        icon: Add,
        onClick: () => {
          dispatch(clearServiceData());
          setOpenDialogBox(true);
        },
      },
    ],
    [dispatch],
  );

  const resolvedButtons = canCreateServices ? buttons : [];

  if (isLoading) {
    return (
      <Box px={0} py={2}>
        <Typography align="center">Loading Services...</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableHeader headerName={pathname} buttons={resolvedButtons} />
      <GridDataUi
        showToolbar={true}
        columns={columns}
        tableData={data}
        checkboxSelection={false}
      />
      <DialogBoxUi
        open={openDialogBox}
        content={<ServiceCreate setOpenDialogBox={setOpenDialogBox} refetch={refetch} />}
        handleClose={() => setOpenDialogBox(false)}
      />
    </>
  );
};

export default ServicesList;
