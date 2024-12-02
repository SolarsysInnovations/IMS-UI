import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { columns } from '../../constants/grid-table-data/customer-table-data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { useGetCustomersListQuery } from '../../redux-store/api/injectedApis';
import { clearCustomerData } from '../../redux-store/slices/customerSlice';
import { useRolePermissions } from '../../hooks/useRolePermission';

const CustomerList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: customers, } = useGetCustomersListQuery();
    const { canCreateCustomers } = useRolePermissions()

    const buttons = [{
        label: 'Create Customer', icon: Add, onClick: () => {
            navigate("/customer/create");
            dispatch(clearCustomerData());
        }
    }];

    const resolvedButtons = canCreateCustomers ? buttons : [];

    const navigate = useNavigate();
    const pathname = usePathname();

    return (
        <>
            <TableHeader headerName={pathname} buttons={resolvedButtons} />
            <GridDataUi showToolbar={true} columns={columns} tableData={customers || []} checkboxSelection={false} />
        </>
    );
}

export default CustomerList;
