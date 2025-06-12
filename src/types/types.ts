import * as Yup from 'yup';

// -------- customer ------------------------
export interface LoginProps {
  userEmail: string;
  // username: string;
  password: string;
}

export interface ForgetPwdProps {
  userEmail: string;
}

export interface GstTypeProps {
  id?: string | undefined;
  gstName: string;
  gstPercentage: number | null;
}
export interface GstTypeFormProps {
  gstTypeValue?: GstTypeProps;
  mode: string;
}
export interface TdsTaxProps {
  id?: string | undefined;
  taxName: string;
  taxPercentage: number | null;
}
export interface TdsTaxFormProps {
  tdsTaxValue: TdsTaxProps;
}
export interface CompanyFormProps {
  companyValue: AdminCompanyUsersInitialValueProps;
  mode?: 'create' | 'edit';
}
export interface LinkFormProps {
  linkValue?: LinkCreationProps;
  handleClose: () => void; // Add this line
}
export interface PaymentTermsProps {
  id?: string;
  termName: string;
  totalDays: number | null;
}
export interface PaymentTermsFormProps {
  paymentTermsValue: PaymentTermsProps;
  mode: string;
}
interface ContactPersonProps {
  contactName: string;
  contactEmail: string;
  contactPhone: number;
}
export interface DyCreateCustomerProps {
  id?: any;
  customerName: string;
  customerType: string;
  companyName: string;
  customerEmail: string;
  customerPhone: number;
  paymentTerms: string;
  country: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  contactPerson: ContactPersonProps[];
}

// types.ts

export interface FormProps {
  fields: FieldProps[];
  initialValues: any;
  validationSchema: any;
  onClose?: () => void;
  showTable?: boolean;
  onSubmit: (values: any, actions: any) => void;
  updateFormValue?: (setFieldValue: Function) => void;
  headerName?: string;
  isSuccessToast?: boolean;
  error?: any;
  toastMessage?: string;
  buttons?: any;
  rows?: number;
}
export interface SubField {
  width: string;
  name: string;
  label: string;
  type: string;
  gridSize?: number;
  validation?: Yup.StringSchema<string>;
  options?: { value: string; label: string }[];
  startAdornment?: any;
  endAdornment?: any;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export interface FieldProps {
  id: number;
  name: string;
  label?: string;
  type: string;
  titleGridSize?: number;
  subFields?: SubField[];
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

// -------- invoice service ------------------------
interface ServiceListProps {
  id: number;
  serviceAccountingCode: string;
  serviceAmount: number;
  serviceHours: number;
  serviceTotalAmount: number;
}

interface TaxAmountProps {
  tds: string;
}
export interface InvoiceInitialValueProps {
  id?: string;
  invoiceDate: Date;
  invoiceType: string;
  invoiceNumber: string;
  customerName: string;
  gstType: string;
  gstPercentage: number | null;
  startDate: string;
  dueDate: string;
  gstInNumber: string;
  paymentTerms: string;
  invoiceStatus: string;
  totalAmount: number | null;
  discountPercentage: number | null;
  notes: string;
  retainerFee: null;
  termsAndConditions: string;
  taxAmount: TaxAmountProps;
  servicesList: ServiceListProps[];
  signatureFile: string | null;
}

export interface ReportsValueProps {
  // invoiceDate: string;
  startDate: string;
  endDate: string;
  filter: string;
}

// ---------- service  --------------------
export interface serviceCreationProps {
  serviceAccountingCode: string;
  serviceDescription: string;
  serviceAmount: number;
}
//----------settings--------
export interface SuperAdminUsersInitialValueProps {
  id?: string;
  file: any;
  userName: string;
  userEmail: string;
  password: string;
  userRole: string;
  userMobile: string;
  description: string;

  companyName: string;
  companyAddress: string;
  companyState: string;
  companyCountry: string;
  companyCity: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  companyTaxNumber: string;
  companyRegNumber: string;
  customerLimit: number;
  invoiceLimit: number;
  userLimit: number;
  serviceLimit: number;
}

export interface AdminCompanyUsersInitialValueProps {
  id?: string;
  userName: string;
  userEmail: string;
  password: string;
  userRole: string;
  userMobile: string;
  description: string;
}

interface LinkCreationProps {
  id: string;
  label: string;
  url: string;
  description: string;
}
// ---------user login --------------------

export interface SendEmailInitialValueProps {
  body: string;
  fromemail: string;
  recipientEmail: string;
  //description: string;
  file: File | null;
  // cc: string;
  subject: string;
}

export interface RoleInitialValueProps {
  id?: string;
  userName: string;
  password: string;
  userRole: string;
  userEmail: string;
  userAccess: string;
  userMobile?: string;
  description?: string;
}

export interface ChangePasswordInitialValueProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  userName: string;
}
