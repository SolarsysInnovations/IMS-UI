import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { columns } from '../../constants/grid-table-data/customer-table-data';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useGetCustomersListQuery } from '../../redux-store/api/injectedApis';
import { clearCustomerData } from '../../redux-store/slices/customerSlice';
import { useRolePermissions } from '../../hooks/useRolePermission';

const CustomerList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useGetCustomersListQuery();
  const { canCreateCustomers } = useRolePermissions();
  const navigate = useNavigate();
  const pathname = usePathname();
  const customers = data ?? [];

  const buttons = [
    {
      label: 'Create Customer',
      icon: Add,
      onClick: () => {
        navigate('/customer/create');
        dispatch(clearCustomerData());
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
