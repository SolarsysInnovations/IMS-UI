import React, { useEffect, useState, useCallback } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import SnackBarUi from '../../components/ui/Snackbar';
import ModalUi from '../../components/ui/ModalUi';
import { Box } from '@mui/material';
import CompanyCreate from './companyCreate';
import { columns } from '../../constants/grid-table-data/company-table-data';
import { useGetCompanyQuery, useUpdateCompanyMutation } from '../../redux-store/company/companiesApi';



const CompanyList = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [updateCustomer, { isSuccess, isError }] = useUpdateCompanyMutation();
    const { data: company, error, isLoading, refetch } = useGetCompanyQuery();

    console.log("companyList", company);

    const [mergedData, setMergedData] = useState<any[]>([]);
    const pathname = usePathname();

    console.log('company vaadasd', company);

    useEffect(() => {
        if (company && !isLoading && !error) {
            const mergedArray: any[] = company.map((item: any) => ({
                // ...item.companyDetails,
                // admin profile
                id: item.register.id,
                userName: item.register.userName,
                userEmail: item.register.userEmail,
                userRole: item.register.userRole,
                userMobile: item.register.userMobile,
                userAccess: item.register.userAccess,

                // company Details
                companyName: item.companyDetails.companyName,
                companyPhone: item.companyDetails.companyPhone
            }));
            console.log("mergedArray new", mergedArray);
            setMergedData(mergedArray);
            console.log('company data', company);
            console.log("merged data", mergedData);
        }
    }, [company, isLoading, error]);

    const buttons = [
        { label: 'Create Company', icon: Add, onClick: () => navigate("/company/create") },
    ];

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns} tableData={mergedData || []} checkboxSelection={false} />
        </>
    );
};

export default CompanyList;
