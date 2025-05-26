import React, { useMemo, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import { CircularProgress, Grid } from '@mui/material';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { columns } from '../../constants/grid-table-data/service-table-data';
import ServiceCreate from './service-create-screen';
import DialogBoxUi from '../../components/ui/DialogBox';
import { useRolePermissions } from '../../hooks/useRolePermission';
import { useQuery } from '@tanstack/react-query';
import { getServiceList } from '../../api/services';

const ServicesList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getServiceList'],
    queryFn: getServiceList,
    staleTime: 5 * 60 * 1000,
  });
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { canCreateServices } = useRolePermissions();
  const pathname = usePathname();

  const buttons = useMemo(
    () => [
      {
        label: 'Create Service List',
        icon: Add,
        onClick: () => {
          setOpenDialogBox(true);
        },
      },
    ],
    [],
  );

  const resolvedButtons = canCreateServices ? buttons : [];

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
        columns={columns}
        tableData={!isError ? data : []}
        checkboxSelection={false}
      />
      <DialogBoxUi
        open={openDialogBox}
        content={<ServiceCreate setOpenDialogBox={setOpenDialogBox} />}
        handleClose={() => setOpenDialogBox(false)}
      />
    </>
  );
};

export default ServicesList;
