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

export type CompanyData = {
    id: string;
    companyName: string;
    companyAddress: string;
    companyState: string;
    companyCountry: string;
    companyEmail: string;
    companyPhone: number;
    companyCell: number;
    companyWebsite: string;
    companyTaxNumber: string;
    companyRegNumber: string;
    userId: string;
    userName: string;
    userEmail: string;
    password: string;
    userRole: string;
    userMobile: number;
    userAccess: string;
    description: string;
    registerCompanyId: string;
};

const CompanyList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [updateCustomer, { isSuccess, isError }] = useUpdateCompanyMutation();
    const { data: company, error, isLoading, refetch } = useGetCompanyQuery();
    const [companyFormData, setCompanyFormData] = useState<any>({});
    const [openModal, setOpenModal] = useState(false);
    const [mergedData, setMergedData] = useState<CompanyData[]>([]);


    console.log('company vaadasd',company);
    
    useEffect(() => {
        if (company && !isLoading && !error) {
            const mergedArray: CompanyData[] = company.map((item: any) => ({
                ...item.companyDetails,
                userId: item.register.id,
                userName: item.register.userName,
                userEmail: item.register.userEmail,
                password: item.register.password,
                userRole: item.register.userRole,
                userMobile: item.register.userMobile,
                userAccess: item.register.userAccess,
                description: item.register.description,
                registerCompanyId: item.register.companyId
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
    
    const handleSubmit = async (values: any) => {
        try {
            // Handle submission logic
            setOpenModal(false); // Close modal on successful submission
        } catch (error) {
            console.log(error);
        }
    };

    const pathname = usePathname();
    const handleModalClose = () => {
        // Handle refetch logic if necessary
        setOpenModal(false);
    };

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true}  columns={columns} tableData={mergedData || []} checkboxSelection={false} /> 
        </>
    );
};

export default CompanyList;
