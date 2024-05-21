import React, { useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import { columns } from '../../constants/grid-table-data/Roles-table-data';
import { useNavigate } from 'react-router-dom'
import { Add } from '@mui/icons-material'
import { useGetRoleQuery } from '../../redux-store/role/roleApi'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import DialogBoxUi from "../../components/ui/DialogBox";
import RolesCreate from './Roles-create-screen';
import { height } from '@mui/system';


const RolesList: React.FC = () => {
    
    const [openemaildialogBox, setIsOpenEmailDialogBox] = useState(false);
    const { data: roleDetails, error, isLoading } = useGetRoleQuery();
    const buttons = [
        { label: 'Create Role', icon: Add, onClick: () => {setIsOpenEmailDialogBox(true);} },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={{} || []} checkboxSelection={false} />
            <DialogBoxUi 
                open={openemaildialogBox} // Set open to true to display the dialog initially
                // title="Custom Dialog Title"
                content={
                   <RolesCreate />
                }
                handleClose={() => {
                    setIsOpenEmailDialogBox(false)
                }}
            />
        </>
    );

};




export default RolesList;


