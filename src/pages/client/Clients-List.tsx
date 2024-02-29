import React, { useEffect } from 'react'
import GridDataUi from '../../components/Grid/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/table-columns-data'
import { useDispatch, useSelector } from 'react-redux'
import { clientListData } from '../../constants/clientData'
import { AppDispatch, RootState } from '../../redux-store/store'
import { fetchClientList } from '../../redux-store/client/fetchClientList'

const ClientList = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchClientList())
    }, [dispatch])
    // const { data: clientListData } = useSelector((state: RootState) => state.clientDataList);
    const { data: clientList } = useSelector((state: RootState) => state.clientList);

    const buttons = [
        { label: 'Create User', icon: Add, onClick: () => navigate("/client/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
    const newData = clientList.map((item: any) => {
        return {
            ...item,
            id: item._id // Rename _id to id
        };
    });
    console.log(newData);

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi columns={columns} tableData={newData} checkboxSelection={false} />
        </>
    )
}

export default ClientList