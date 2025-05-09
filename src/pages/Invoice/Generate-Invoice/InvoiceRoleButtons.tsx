import { Box, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import ButtonUi from '../../../components/ui/Button';
import { InvoiceOptions, InvoiceStatus, Roles } from '../../../constants/Enums';
import { selectCurrentId } from '../../../redux-store/auth/authSlice';
import SplitButton from '../../../components/ui/SplitButton';
import StageStepper from '../../../components/ui/StepperUi';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import {
  useGetInvoiceListQuery,
  useGetUserRoleMutation,
  useUpdateInvoiceMutation,
} from '../../../redux-store/api/injectedApis';
import { useSelector } from 'react-redux';

const InvoiceRoleButtons = () => {
  const [
    updateInvoice,
    {
      isSuccess: invoiceUpdateSuccess,
      isError: invoiceUpdateError,
      error: invoiceUpdateErrorObject,
    },
  ] = useUpdateInvoiceMutation();
  const invoiceData = useSelector((state: any) => state.invoiceState.data);
  const [getUserRole, { data: userRoleData, isLoading: isRoleLoading }] =
    useGetUserRoleMutation();
  const [currentInvoiceStatus, setCurrentInvoiceStatus] = useState<number>(-1);
  const [showTracker, setShowTracker] = useState(false);
  const { refetch } = useGetInvoiceListQuery();
  const [resMessage, setResMessage] = useState('');
  const id = useSelector(selectCurrentId);

  useSnackbarNotifications({
    error: invoiceUpdateError,
    errorObject: invoiceUpdateErrorObject,
    errorMessage: 'Error While updating',
    success: invoiceUpdateSuccess,
    successMessage: resMessage,
  });

  useEffect(() => {
    refetch();
  }, [invoiceUpdateSuccess, refetch]);

  useEffect(() => {
    if (invoiceData) {
      const currentInvoiceStatus = Object.values(InvoiceStatus).indexOf(
        invoiceData.invoiceStatus,
      );
      if (currentInvoiceStatus !== -1) {
        setCurrentInvoiceStatus(currentInvoiceStatus);
      }
    }
  }, [invoiceData]);

  useEffect(() => {
    if (id) {
      getUserRole(id); // Trigger fetching the user role
    }
  }, [id, getUserRole]);

  const handleOptionClick = async (option: any) => {
    if (invoiceData.invoiceStatus !== option) {
      try {
        let updatedInvoiceData = { ...invoiceData };
        let newStatus;

        switch (option) {
          case InvoiceOptions.APPROVE:
            newStatus = InvoiceStatus.APPROVED;
            break;
          case InvoiceOptions.RETURN:
            newStatus = InvoiceStatus.RETURNED;
            break;
          case InvoiceOptions.PAID:
            newStatus = InvoiceStatus.PAID;
            break;
          case InvoiceOptions.SENT_TO_APPROVER:
            newStatus = InvoiceStatus.PENDING;
            break;
          default:
            return;
        }

        if (newStatus) {
          updatedInvoiceData = { ...invoiceData, invoiceStatus: newStatus };
        }

        let response = await updateInvoice({
          id: invoiceData.id,
          data: updatedInvoiceData,
        });
        setResMessage(response.data.message);
      } catch (error) {
        console.error('Error updating invoice data', error);
      }
    }
  };

  const getAvailableOptions = () => {
    const allOptions = [];
    const userRole = userRoleData?.role; // Dynamically fetched role

    switch (userRole) {
      case Roles.ADMIN:
      case Roles.STANDARDUSER:
        if (
          invoiceData.invoiceStatus === InvoiceStatus.DRAFT ||
          invoiceData.invoiceStatus === InvoiceStatus.RETURNED
        ) {
          allOptions.push(InvoiceOptions.SENT_TO_APPROVER);
        } else if (invoiceData.invoiceStatus === InvoiceStatus.APPROVED) {
          allOptions.push(InvoiceOptions.PAID);
        }
        break;
      case Roles.APPROVER:
        if (invoiceData.invoiceStatus === InvoiceStatus.PENDING) {
          allOptions.push(InvoiceOptions.APPROVE, InvoiceOptions.RETURN);
        }
        break;
      default:
        return [];
    }
    return allOptions.filter((option) => option !== invoiceData.invoiceStatus);
  };

  const availableOptions = getAvailableOptions();

  return isRoleLoading ? (
    <Box>Loading...</Box>
  ) : (
    <Box
      gap={2}
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexDirection: 'row',
        gap: '20px',
        marginTop: '10px',
      }}
    >
      <SplitButton
        key={currentInvoiceStatus} // Ensure re-render
        disabledOptions={[availableOptions.indexOf(invoiceData.invoiceStatus)]}
        options={availableOptions}
        defaultIndex={0} // Always use the first available option as the default
        onOptionClick={handleOptionClick}
      />

      <Box sx={{ position: 'relative' }}>
        <ButtonUi
          label="View Tracker"
          smallButtonCss
          onMouseEnter={() => setShowTracker(true)}
          onMouseLeave={() => setShowTracker(false)}
        />
        <Card
          sx={{
            padding: '20px 25px',
            position: 'absolute',
            top: -150,
            right: 0,
            zIndex: 1300,
            backgroundColor: 'background.paper',
            borderRadius: '10px',
            display: showTracker ? 'block' : 'none',
          }}
        >
          <StageStepper stages={invoiceData.invoiceStages} />
        </Card>
      </Box>
    </Box>
  );
};

export default InvoiceRoleButtons;
