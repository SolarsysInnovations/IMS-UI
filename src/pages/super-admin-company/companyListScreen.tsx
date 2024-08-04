import React, { useEffect, useState, useCallback } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { columns } from '../../constants/grid-table-data/company-table-data';
import { useGetUsersListQuery } from '../../redux-store/api/injectedApis';

interface CompanyDetails {
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

interface AdminDetails {
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
    companyDetails: CompanyDetails;
    adminDetails: AdminDetails;
}

const CompanyList = () => {
    const navigate = useNavigate();
    const { data: company, error, isLoading, refetch } = useGetUsersListQuery();
    const [mergedData, setMergedData] = useState<any[]>([]);
    const pathname = usePathname();

    console.log("company", company);

    useEffect(() => {
        if (company && !isLoading && !error) {
            const mergedArray = company.map((item: CompanyAdminData) => ({
                // Admin profile
                id: item.adminDetails.id,
                userName: item.adminDetails.userName,
                userEmail: item.adminDetails.userEmail,
                userRole: item.adminDetails.userRole,
                userMobile: item.adminDetails.userMobile,
                userAccess: item.adminDetails.description,

                // Company Details
                companyName: item.companyDetails.companyName,
                companyPhone: item.companyDetails.companyPhone,
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
