import React, { useEffect, useState } from 'react'
import GridDataUi from '../../components/GridTable/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux-store/store'
import { useGetRoleQuery } from '../../redux-store/role/roleApi'
import { columns } from './Roles-table-data'
import DialogBoxUi from '../../components/ui/DialogBox'
import UserForm from './UserForm'
import { useGetServiceListQuery, useGetUsersListQuery } from '../../redux-store/api/injectedApis'
import { useRolePermissions } from '../../hooks/useRolePermission'



const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [opendialogBox, setIsOpenDialogBox] = useState(false);
    const { data: serviceList, error, isLoading } = useGetServiceListQuery();
    const { data: userListData, refetch: userListRefetch } = useGetUsersListQuery();
    const pathname = usePathname();
    // 
    const companyUserData = useSelector((state: any) => state.globalState.data);

    const [key, setKey] = useState<number>(0);
    const { canCreateUsers } = useRolePermissions();

    const mode = companyUserData ? 'edit' : 'create';

    useEffect(() => {
        setKey(prev => prev + 1);
    }, [companyUserData]);

    const buttons = [
        { label: 'Create New User', icon: Add, onClick: () => { setIsOpenDialogBox(true) } },
    ];

    const resolvedButtons = canCreateUsers ? buttons : [];

    return (
        <>
            <TableHeader headerName={pathname} buttons={resolvedButtons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={userListData || []} checkboxSelection={false} />
            {/* ----------------- form popup screen below ----------------- */}
            <DialogBoxUi open={opendialogBox} content={<UserForm key={key} mode={mode} userEditValue={companyUserData} />} handleClose={() => setIsOpenDialogBox(false)}
            />
        </>
    )
}

export default UserList
