import GridDataUi from '../../components/GridTable/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/grid-table-data/customer-table-data'
import { Country, State } from 'country-state-city'
import { useGetCustomersListQuery, useUpdateCustomerMutation } from '../../redux-store/api/injectedApis'
import { clearCustomerData } from '../../redux-store/slices/customerSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux-store/store'

const CustomerList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [updateCustomer, { isSuccess, isError }] = useUpdateCustomerMutation();
    const { data: customers, error, isLoading, refetch } = useGetCustomersListQuery();

    const role = localStorage.getItem("userRole");

    const buttons = [{
        label: 'Create Customer', icon: Add, onClick: () => {
            navigate("/customer/create")
            dispatch(clearCustomerData());
        }
    }];

    const navigate = useNavigate();
    const pathname = usePathname();

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns} tableData={customers || []} checkboxSelection={false} />
        </>
    )
}

export default CustomerList
