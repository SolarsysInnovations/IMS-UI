import React, { useState } from 'react';
import RolesGridDataUi from './Roles-table-data'
import { Add } from '@mui/icons-material';
import { useDeleteRoleMutation, useGetRoleQuery } from '../../redux-store/role/roleApi';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import DialogBoxUi from '../../components/ui/DialogBox';
import RoleForm from './Roles-form';
import { GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import ToastUi from '../../components/ui/ToastifyUi'

const RolesList: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [roleId, setRoleId] = useState<string | null>(null);
    const { data: roleDetails, refetch } = useGetRoleQuery();
    const pathname = usePathname();
    const [deleteRole] = useDeleteRoleMutation();

    const handleModalClose = () => {
        setOpenModal(false);
        refetch();
    };

    const handleAddClick = () => {
        setRoleId(null);
        setOpenModal(true);
        setOpenModal(true);
    }
    
    const buttons = [
        { label: 'Create Role', icon: Add, onClick: handleAddClick },
    ];
    
    const handleEditClick = (id: string) => {
        setRoleId(id);
        setOpenModal(true);
    }

    const handleDeleteClick = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this role?");
        if (confirmed) {
            await deleteRole(id);
            toast.success("Successfully deleted the selected role", toastConfig);
            refetch();
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'Action',
            headerName: 'Action',
            width: 140,
            renderCell: undefined,
        },
        {
            field: 'username',
            headerName: 'User Name',
            width: 150,
            editable: true,
        },
        {
            field: 'userRole',
            headerName: 'User Role',
            width: 150,
            editable: true,
        },
        {
            field: 'userEmail',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'userAccess',
            headerName: 'Access',
            width: 150,
            editable: true,
        },
    ];

    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <RolesGridDataUi showToolbar={true} columns={columns || []} tableData={roleDetails || []} checkboxSelection={false} onRowEdit={(roleId) => handleEditClick(roleId)} 
                onRowDelete={handleDeleteClick}/>
            <DialogBoxUi
                open={openModal}
                content={<RoleForm roleId={roleId} onClose={handleModalClose} />}
                handleClose={handleModalClose}
            />
        </>
    );
};

export default RolesList;