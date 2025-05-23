import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from '../../constants/grid-table-data/customer-table-data';
import { useRolePermissions } from '../../hooks/useRolePermission';
import { useQuery } from '@tanstack/react-query';
import { getCustomerList } from '../../api/services';

const CustomerList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getCustomerList'],
    queryFn: getCustomerList,
    staleTime: 5 * 60 * 1000,
  });
  const { canCreateCustomers } = useRolePermissions();
  const navigate = useNavigate();
  const pathname = usePathname();
  const customers = !isError ? data : [];

  const buttons = [
    {
      label: 'Create Customer',
      icon: Add,
      onClick: () => {
        navigate('/customer/create');
      },
    },
  ];

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
      {canCreateCustomers && (
        <TableHeader headerName={pathname} buttons={buttons} />
      )}
      <GridDataUi
        showToolbar={true}
        columns={columns}
        tableData={customers}
        checkboxSelection={false}
      />
    </>
  );
};

export default CustomerList;
