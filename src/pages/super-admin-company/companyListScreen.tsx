import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { columns } from '../../constants/grid-table-data/company-table-data';
import { useGetUsersListQuery } from '../../redux-store/api/injectedApis';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { clearUserData } from '../../redux-store/slices/userSlice';
import { useRolePermissions } from '../../hooks/useRolePermission';

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

interface UserDetails {
  userEmail: string;
  userName: string;
  password: string;
  userRole: string;
  userMobile: string;
  description: string;
  companyId: string;
  id: string;
}

interface CompanyUserData {
  companyDetails: CompanyDetails;
  userDetails: UserDetails;
}

const CompanyList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: company, error, isLoading } = useGetUsersListQuery();
  const [mergedData, setMergedData] = useState<any[]>([]);
  const pathname = usePathname();
  const { canCreateCompanies } = useRolePermissions();

  useEffect(() => {
    if (company && !isLoading && !error) {
      const mergedArray = company.map((item: CompanyUserData) => ({
        // Admin profile
        id: item.userDetails.id,
        userName: item.userDetails.userName,
        userEmail: item.userDetails.userEmail,
        userRole: item.userDetails.userRole,
        userMobile: item.userDetails.userMobile,
        userAccess: item.userDetails.description,

        // Company Details
        companyName: item.companyDetails.companyName,
        companyPhone: item.companyDetails.companyPhone,
      }));
      setMergedData(mergedArray);
    }
  }, [company, isLoading, error]);

  const buttons = [
    {
      label: 'Create Company',
      icon: Add,
      onClick: () => {
        navigate('/company/create');
        dispatch(clearUserData());
      },
    },
  ];

  const resolvedButtons = canCreateCompanies ? buttons : [];

  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <TableHeader headerName={pathname} buttons={resolvedButtons} />
      {mergedData && (
        <GridDataUi
          showToolbar={true}
          columns={columns}
          tableData={mergedData || []}
          checkboxSelection={false}
        />
      )}
    </>
  );
};

export default CompanyList;
