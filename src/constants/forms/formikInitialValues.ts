import {
  ArAgingInitialValueProps,
  ChangePasswordInitialValueProps,
  ForgetPwdProps,
  GstTypeProps,
  InvoiceInitialValueProps,
  InvoicesInitialValueProps,
  LoginProps,
  PaymentTermsProps,
  RoleInitialValueProps,
  SendEmailInitialValueProps,
  SuperAdminUsersInitialValueProps,
  TdsTaxProps,
} from '../../types/types';

export const loginInitialValue: LoginProps = {
  userEmail: '',
  password: '',
};
export const forgetPwdInitialValue: ForgetPwdProps = {
  userEmail: '',
};

//
export const superAdminCompanyUsersInitialValues: SuperAdminUsersInitialValueProps =
  {
    // * ---------- user registration ----------
    id: '',
    file: null,
    userName: '',
    userEmail: '',
    password: '',
    userRole: '',
    userMobile: '',
    description: '',
    // * ---------- company information ----------
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyCountry: '',
    companyCity: '',
    companyState: '',
    companyAddress: '',
    companyWebsite: '',
    companyTaxNumber: '',
    companyRegNumber: '',
    // * ----------user configuration ----------
    customerLimit: 0,
    invoiceLimit: 0,
    userLimit: 0,
    serviceLimit: 0,
  };

export const customerInitialValues = {
  customerType: '',
  customerName: '',
  companyName: '',
  customerEmail: '',
  customerPhone: '',
  paymentTerms: '',
  panNumber: '',
  country: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  contactPersons: [
    {
      contactName: '',
      contactEmail: '',
      contactPhone: '',
    },
  ],
};

export const serviceInitialValues = {
  serviceAccountingCode: '',
  serviceDescription: '',
  serviceAmount: '',
};
export const linkInitialValues = {
  label: '',
  url: '',
  description: '',
};
export const gstTypeInitialValue: GstTypeProps = {
  gstName: '',
  gstPercentage: 0,
};

export const tdsTaxInitialValue: TdsTaxProps = {
  taxName: '',
  taxPercentage: 0,
};

export const paymentTermsInitialValue: PaymentTermsProps = {
  termName: '',
  totalDays: 0,
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const currentDate = new Date();
const defaultInvoiceType = `IMS-${formatDate(currentDate)}`;

export const invoiceCreateInitialValue: InvoiceInitialValueProps = {
  invoiceDate: new Date(),
  invoiceType: '',
  invoiceNumber: defaultInvoiceType,
  customerName: '',
  gstType: '',
  gstPercentage: null,
  gstInNumber: '',
  paymentTerms: '',
  startDate: '',
  dueDate: '',
  invoiceStatus: 'DRAFT',
  discountPercentage: null,
  totalAmount: null,
  retainerFee: null,
  notes: 'Thanks for your business transaction',
  termsAndConditions: '',
  taxAmount: {
    tds: '',
  },
  servicesList: [],
  signatureFile: null,
};

export const invoicesInitialValue: InvoicesInitialValueProps = {
  // invoiceDate: "",
  startDate: '',
  endDate: '',
  filter: 'invoiceReport',
};

export const AragingInitialValue: ArAgingInitialValueProps = {
  // invoiceDate: "",
  startDate: '',
  endDate: '',
  filter: 'agingReport',
};

export const SendEmailInitialValue: SendEmailInitialValueProps = {
  recipientEmail: '',
  fromemail: '',
  file: null,
  // cc: "",
  subject: '',
  body: '',
};

export const RoleInitialValue: RoleInitialValueProps = {
  userName: '',
  userRole: '',
  userEmail: '',
  userAccess: '',
  password: '',
  userMobile: '',
  description: '',
};

export const ChangePasswordInitialValue: ChangePasswordInitialValueProps = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  userName: '',
};
