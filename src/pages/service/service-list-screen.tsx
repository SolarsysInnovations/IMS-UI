import React, { useEffect, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, } from '../../redux-store/store';
import { columns } from '../../constants/grid-table-data/service-table-data';
import ModalUi from '../../components/ui/ModalUi';
import { Box } from '@mui/material';
import ServiceCreate from './service-create-screen';
import ServiceEditScreen from './service-edit-screen'; // Import the edit screen
import { useGetServiceListQuery } from '../../redux-store/api/injectedApis';
import DialogBoxUi from '../../components/ui/DialogBox';
import { clearServiceData } from '../../redux-store/slices/serviceSlice';
import { useRolePermissions } from '../../hooks/useRolePermission';

const ServicesList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: serviceList, error, isLoading, refetch } = useGetServiceListQuery();
    const serviceStateDetails = useSelector((state: any) => state.globalState.data);
    const [opendialogBox, setIsOpenDialogBox] = useState(false);

    const { canCreateServices } = useRolePermissions();
    const buttons = [
        {
            label: 'Create Service List', icon: Add, onClick: () => {
                dispatch(clearServiceData());
                setIsOpenDialogBox(true);
            }
        },
    ];

    const resolvedButtons = canCreateServices ? buttons : [];
    const pathname = usePathname();

    return (
        <>
            <TableHeader headerName={pathname} buttons={resolvedButtons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={serviceList || []} checkboxSelection={false} />
            <DialogBoxUi
                open={opendialogBox}
                content={
                    <>
                        <ServiceCreate setIsOpenDialogBox={setIsOpenDialogBox} />
                    </>
                }
                handleClose={() => {
                    setIsOpenDialogBox(false)
                }}
            />
        </>
    );
};

export default ServicesList;
