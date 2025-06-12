import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import InvoiceDocument from './InvoiceDocument';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { Box } from '@mui/system';
import StageStepper from '../../../components/ui/StepperUi';
import ButtonUi from '../../../components/ui/Button';
import SplitButton from '../../../components/ui/SplitButton';
import { InvoiceOptions, InvoiceStatus, Roles } from '../../../constants/Enums';
import { Card } from '@mui/material';
import DialogBoxUi from '../../../components/ui/DialogBox';
import SendEmail from '../Send-email';
import { useInVoiceContext } from '../../../context/invoiceContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCustomerList,
  getSingleCompany,
  getTdsTaxList,
  getcompanyLogo,
  updateInvoice,
} from '../../../api/services';

const InvoiceLetterUi = ({
  inVoiceValue,
  setIsModalOpen,
}: {
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  inVoiceValue?: any;
}) => {
  const queryClient = useQueryClient();
  const context = useInVoiceContext();
  const companyIdString = context.companyDetails.companyId ?? '';
  const userRole = context.userDetails.userRole;
  const [data, setData] = useState();
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [currentInvoiceStatus, setCurrentInvoiceStatus] = useState<number>(-1);
  const [isOpenDialogBox, setIsOpenDialogBox] = useState(false);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [showTracker, setShowTracker] = useState(false);
  const [newStatus, setNewStatus] = useState<InvoiceStatus>();

  const { data: logoData, isSuccess: logoSuccess } = useQuery({
    queryKey: ['getCompanyLogo', companyIdString],
    queryFn: ({ queryKey }) => {
      const [, companyIdString] = queryKey;
      if (!companyIdString) throw new Error('CompanyId is missing');
      return getcompanyLogo(companyIdString);
    },
    enabled: !!companyIdString,
    staleTime: 5 * 60 * 1000,
  });

  const { data: companyData, isSuccess: isCompanySuccess } = useQuery({
    queryKey: ['getSingleCompany', companyIdString],
    queryFn: ({ queryKey }) => {
      const id = queryKey[1];
      if (!id) throw new Error('Id is missing');
      return getSingleCompany(id);
    },
    enabled: !!companyIdString,
    staleTime: 5 * 60 * 1000,
  });

  const { data: customers, isSuccess: isCustomerSuccess } = useQuery({
    queryKey: ['getCustomerList'],
    queryFn: getCustomerList,
    staleTime: 5 * 60 * 1000,
  });

  const { data: tdsTaxList, isSuccess: isTdsTaxListSuccess } = useQuery({
    queryKey: ['getTdsTaxList'],
    queryFn: getTdsTaxList,
    staleTime: 5 * 60 * 1000,
  });

  const updateInvoiceMutation = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'getInvoiceList',
      });
      if (typeof setIsModalOpen === 'function') {
        setIsModalOpen(false);
      } else {
        console.error('setIsModalOpen is not a function', setIsModalOpen);
      }
    },
  });

  const getAvailableOptions = () => {
    const allOptions = [];
    switch (userRole) {
      case Roles.ADMIN:
      case Roles.STANDARDUSER:
        if (
          inVoiceValue.invoiceStatus === InvoiceStatus.DRAFT ||
          inVoiceValue.invoiceStatus === InvoiceStatus.RETURNED
        ) {
          allOptions.push(InvoiceOptions.SENT_TO_APPROVER);
        } else if (inVoiceValue.invoiceStatus === InvoiceStatus.APPROVED) {
          allOptions.push(InvoiceOptions.MAILED);
        } else if (inVoiceValue.invoiceStatus === InvoiceStatus.MAILED) {
          allOptions.push(InvoiceOptions.PAID);
        }
        break;
      case Roles.APPROVER:
        if (inVoiceValue.invoiceStatus === InvoiceStatus.PENDING) {
          allOptions.push(InvoiceOptions.APPROVE, InvoiceOptions.RETURN);
        }
        break;
      default:
        return [];
    }
    return allOptions.filter((option) => option !== inVoiceValue.invoiceStatus);
  };

  const availableOptions = getAvailableOptions();

  const handleDownload = async () => {
    const doc = (
      <InvoiceDocument inVoiceValue={data} companyLogo={base64String} />
    );
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invoice.pdf';
    link.click();
  };

  const handleDialogBoxClose = () => {
    setIsOpenDialogBox(false);
  };
  const handleEmailSuccess = async () => {
    handleDialogBoxClose();

    if (inVoiceValue.invoiceStatus === InvoiceStatus.APPROVED) {
      const updatedInvoiceData = {
        ...inVoiceValue,
        invoiceStatus: InvoiceStatus.MAILED,
      };
      await updateInvoice({ id: inVoiceValue.id, data: updatedInvoiceData });
    }
  };

  const handleOptionClick = async (option: any) => {
    if (option === InvoiceOptions.MAILED) {
      setIsOpenDialogBox(true);
      return;
    }

    if (inVoiceValue.invoiceStatus !== option) {
      try {
        let updatedInvoiceData = { ...inVoiceValue };

        switch (option) {
          case InvoiceOptions.APPROVE:
            setNewStatus(InvoiceStatus.APPROVED);
            break;
          case InvoiceOptions.RETURN:
            setNewStatus(InvoiceStatus.RETURNED);
            break;
          case InvoiceOptions.MAILED:
            setNewStatus(InvoiceStatus.MAILED);
            break;
          case InvoiceOptions.PAID:
            setNewStatus(InvoiceStatus.PAID);
            break;
          case InvoiceOptions.SENT_TO_APPROVER:
            setNewStatus(InvoiceStatus.PENDING);
            break;
          default:
            return;
        }
        if (newStatus) {
          updatedInvoiceData = { ...inVoiceValue, invoiceStatus: newStatus };
        }

        updateInvoiceMutation.mutate({
          id: inVoiceValue.id,
          data: updatedInvoiceData,
        });
      } catch (error) {
        console.error('Error in handleOptionClick:', error);
      }
    }
  };

  useEffect(() => {
    if (inVoiceValue) {
      const currentInvoiceStatus = Object.values(InvoiceStatus).indexOf(
        inVoiceValue.invoiceStatus,
      );
      if (currentInvoiceStatus !== -1) {
        setCurrentInvoiceStatus(currentInvoiceStatus);
      }
    }
  }, [inVoiceValue]);

  useEffect(() => {
    if (inVoiceValue && customers && companyDetails && tdsTaxList) {
      const filteredCustomer = customers.find(
        (customer: any) => customer.customerName === inVoiceValue.customerName,
      );

      const subTotalValue = inVoiceValue.servicesList.reduce(
        (acc: number, service: any) => acc + service.serviceTotalAmount,
        0,
      );

      const discountPercentageValue =
        (subTotalValue * inVoiceValue.discountPercentage) / 100;

      const gstPercentageValue =
        ((subTotalValue - discountPercentageValue) *
          inVoiceValue.gstPercentage) /
        100;

      const filteredTdsTax = tdsTaxList.find(
        (tdsTax: any) => inVoiceValue.taxAmount.tds === tdsTax.taxName,
      );

      const totalValueBeforeTds =
        subTotalValue - discountPercentageValue + gstPercentageValue;

      let tdsAmount = 0;
      if (filteredTdsTax) {
        tdsAmount = (totalValueBeforeTds * filteredTdsTax.taxPercentage) / 100;
      }

      const finalTotalValue = totalValueBeforeTds - tdsAmount;
      const mergedData = {
        ...inVoiceValue,
        companyDetails: { ...companyDetails.companyDetails },
        customerDetails: filteredCustomer ?? inVoiceValue.customerDetails,
        startDate: inVoiceValue.startDate,
        dueDate: inVoiceValue.dueDate,
        invoiceDate: inVoiceValue.invoiceDate,
        subTotal: Math.round(subTotalValue),
        tdsAmountValue: Math.round(tdsAmount),
        discountPercentageValue: Math.round(discountPercentageValue),
        gstPercentageValue: Math.round(gstPercentageValue),
        totalValue: Math.round(finalTotalValue),
      };
      setData(mergedData);
    }
  }, [inVoiceValue, isCustomerSuccess, isCompanySuccess, isTdsTaxListSuccess]);

  useEffect(() => {
    if (companyData) {
      setCompanyDetails(companyData);
    }
  }, [isCompanySuccess]);

  useEffect(() => {
    if (logoData?.companyLogo) {
      setBase64String(`data:image/jpeg;base64,${logoData.companyLogo}`);
    }
  }, [logoSuccess]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '0px 30px 30px 30px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '85vh',
            textAlign: 'center',
            overflow: 'hidden',
            alignItems: 'center',
          }}
        >
          {base64String ? (
            <PDFViewer
              showToolbar={false}
              style={{
                overflow: 'hidden',
                width: '400px',
                height: '770px',
                border: 'none',
                backgroundColor: 'transparent',
                marginTop: '5px',
              }}
            >
              <InvoiceDocument inVoiceValue={data} companyLogo={base64String} />
            </PDFViewer>
          ) : (
            <div>Loading PDF...</div>
          )}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Box
            gap={2}
            sx={{
              display: 'flex',
              justifyContent: 'right',
              flexDirection: 'row',
              gap: '20px',
              marginTop: '10px',
            }}
          >
            <ButtonUi
              label="Download Pdf"
              smallButtonCss
              onClick={() => {
                handleDownload();
              }}
            />
            {(userRole === Roles.ADMIN || userRole === Roles.STANDARDUSER) &&
              inVoiceValue.invoiceStatus === InvoiceStatus.DRAFT && (
                <ButtonUi
                  label="Send for Approver"
                  smallButtonCss
                  onClick={() => {
                    handleOptionClick(InvoiceOptions.SENT_TO_APPROVER).catch(
                      (error) => {
                        console.error('Error handling option click:', error);
                      },
                    );
                  }}
                />
              )}
            {availableOptions.length > 0 && (
              <SplitButton
                key={currentInvoiceStatus}
                disabledOptions={[
                  availableOptions.indexOf(inVoiceValue.invoiceStatus),
                ]}
                options={availableOptions}
                defaultIndex={0}
                onOptionClick={handleOptionClick}
              />
            )}

            <Box sx={{ position: 'relative' }}>
              <ButtonUi
                label="View Tracker"
                smallButtonCss
                onMouseEnter={() => setShowTracker(true)}
                onMouseLeave={() => setShowTracker(false)}
              />
              <Card
                sx={{
                  padding: '10px 25px',
                  position: 'absolute',
                  top: -120,
                  right: 5,
                  zIndex: 1300,
                  backgroundColor: 'background.paper',
                  borderRadius: '10px',
                  display: showTracker ? 'block' : 'none',
                }}
              >
                <StageStepper stages={inVoiceValue.invoiceStages} />
              </Card>
            </Box>
          </Box>
        </div>
      </Box>

      <DialogBoxUi
        open={isOpenDialogBox}
        content={
          <SendEmail invoiceData={data} onSuccess={handleEmailSuccess} />
        }
        handleClose={handleDialogBoxClose}
      />
    </>
  );
};

export default InvoiceLetterUi;
