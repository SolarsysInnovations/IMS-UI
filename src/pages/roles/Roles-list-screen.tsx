import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import { useGetRoleQuery } from '../../redux-store/role/roleApi';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import DialogBoxUi from '../../components/ui/DialogBox';
import RoleForm from './Roles-form';
import GridDataUi from '../../components/GridTable/GridData';
import { columns } from './Roles-table-data';
import { RolesFields } from '../../constants/form-data/form-data-json';


const RolesList: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [roleId, setRoleId] = useState<string | null>(null);
    const { data: roleDetails, refetch } = useGetRoleQuery();
    const pathname = usePathname();

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

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={roleDetails || []} checkboxSelection={false}  />
            <DialogBoxUi
                open={openModal}
                content={<RoleForm onClose={handleModalClose} RolesEditInitialValues={undefined} HeaderName="Create Role" RolesFields={RolesFields} />}
                handleClose={handleModalClose}
            />
        </>
    );
};

export default RolesList;