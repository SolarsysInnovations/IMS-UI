import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import TableHeader from '../../../components/layouts/TableHeader';
import SettingsCompanyForm from './SettingsCompanyForm';
import { Edit } from '@mui/icons-material';
import DialogBoxUi from '../../../components/ui/DialogBox';
import { useInVoiceContext } from '../../../context/invoiceContext';
import { Roles } from '../../../constants/Enums';
import { useQuery } from '@tanstack/react-query';
import { getCompanyData, getcompanyLogo } from '../../../api/services';

const SettingsCompanyDetailsScreen: React.FC = () => {
  const context = useInVoiceContext();
  const userRole = context.userDetails.userRole;
  const userId = context.userDetails.userId;
  const companyId = context.companyDetails.companyId;
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [base64String, setBase64String] = useState<string | null>(null);

  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isSuccess: isCompanySuccess,
  } = useQuery({
    queryKey: ['getCompanyData', userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      if (!userId) throw new Error('UserId is missing');
      return getCompanyData(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: logoData,
    isLoading: idLogoLoading,
    isSuccess: isLogoSuccess,
    isError: isLogoError,
  } = useQuery({
    queryKey: ['getCompanyLogo', companyId],
    queryFn: ({ queryKey }) => {
      const [, companyId] = queryKey;
      if (!companyId) throw new Error('CompanyId is missing');
      return getcompanyLogo(companyId);
    },
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isLogoSuccess) {
      setBase64String(`data:image/jpeg;base64,${logoData.companyLogo}`);
    } else {
      setBase64String(null);
    }
  }, [logoData, isLogoSuccess, isLogoError]);

  useEffect(() => {
    if (companyData) {
      setCompanyDetails(companyData);
    }
  }, [companyData]);

  const handleEditClick = async () => {
    setOpenDialogBox(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogBox(false);
  };

  const button =
    userRole !== Roles.APPROVER && userRole !== Roles.STANDARDUSER
      ? [{ label: 'Edit', icon: Edit, onClick: handleEditClick }]
      : [];

  if (isCompanyLoading || idLogoLoading) {
    return (
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        height={'50vh'}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <DialogBoxUi
        open={openDialogBox}
        content={
          <SettingsCompanyForm
            companyValue={companyDetails}
            mode="edit"
            handleCloseDialog={handleCloseDialog}
          />
        }
        handleClose={handleCloseDialog}
      />
      <TableHeader buttons={button} />

      {isCompanySuccess && (
        <Grid
          container
          sx={{ backgroundColor: '#f8f9f9', padding: '20px 20px' }}
        >
          <Grid item xs={7}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company Name
                  </span>
                  <span>: {companyDetails?.companyName}</span>
                </p>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  margin: '0 0 5px 0',
                  display: 'flex',
                }}
              >
                <span
                  style={{
                    fontWeight: '500',
                    width: '140px',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', // Optional for long labels
                  }}
                >
                  Company Address
                </span>
                <span style={{ flex: 1 }}>
                  {' '}
                  : {companyDetails?.companyAddress}
                </span>
              </p>

              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company State
                  </span>
                  <span>: {companyDetails?.companyState}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company Country
                  </span>
                  <span>: {companyDetails?.companyCountry}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company E-mail
                  </span>
                  <span>: {companyDetails?.companyEmail}</span>
                </p>
              </div>
            </Box>
          </Grid>
          <Grid sx={{ marginTop: '0px' }} item xs={4}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company Phone
                  </span>
                  <span>: {companyDetails?.companyPhone}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company Website
                  </span>
                  <span>: {companyDetails?.companyWebsite}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company Tax Num
                  </span>
                  <span>: {companyDetails?.companyTaxNumber}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: '13px', margin: '0 0 5px 0' }}>
                  <span
                    style={{
                      fontWeight: '500',
                      width: '140px',
                      display: 'inline-block',
                    }}
                  >
                    Company Reg Num
                  </span>
                  <span>: {companyDetails?.companyRegNumber}</span>
                </p>
              </div>

              {userId && userRole === 'ADMIN' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ marginTop: '10px' }}
                    >
                      <Box
                        component="span"
                        fontWeight={500}
                        width="140px"
                        fontSize="13px"
                      >
                        Logo
                      </Box>
                      :{' '}
                      <Box
                        sx={{
                          width: '150px',
                          height: '150px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: base64String ? '1px solid #ddd' : 'none', // Conditional border
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: base64String
                            ? 'transparent'
                            : '#f8f9fa', // Optional background for no image
                        }}
                      >
                        {base64String ? (
                          <img
                            src={base64String}
                            alt="Company Logo"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        ) : (
                          <Box component="span" fontSize="13px">
                            No image available
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SettingsCompanyDetailsScreen;
