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

interface Company {
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyCountry: string;
    companyState: string;
    companyAddress: string;
    companyWebsite: string;
    companyTaxNumber: string;
    companyRegNumber: string;
    id: string;
}

interface Admin {
    userEmail: string;
    userName: string;
    password: string;
    userRole: string;
    userMobile: string;
    description: string;
    companyId: string;
    id: string;
}

interface CompanyAdminData {
    company: Company;
    admin: Admin;
}

const CompanyList = () => {
    const navigate = useNavigate();
    const { data: company, error, isLoading, refetch } = useGetCompanyQuery();
    const [mergedData, setMergedData] = useState<any[]>([]);
    const pathname = usePathname();

    console.log("company", company);

    useEffect(() => {
        if (company && !isLoading && !error) {
            const mergedArray = company.map((item: CompanyAdminData) => ({
                // Admin profile
                id: item.company.id,
                userName: item.admin.userName,
                userEmail: item.admin.userEmail,
                userRole: item.admin.userRole,
                userMobile: item.admin.userMobile,
                userAccess: item.admin.description,

                // Company Details
                companyName: item.company.companyName,
                companyPhone: item.company.companyPhone,
            }));
            setMergedData(mergedArray);
        }
    }, [company, isLoading, error]);

    const buttons = [
        { label: 'Create Company', icon: Add, onClick: () => navigate("/company/create") },
    ];

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            {mergedData && (
                <GridDataUi showToolbar={true} columns={columns} tableData={mergedData || []} checkboxSelection={false} />
            )}
        </>
    );
};

export default CompanyList;
