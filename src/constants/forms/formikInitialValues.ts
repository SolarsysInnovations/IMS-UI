import { number } from "yup";
import { InvoiceInitialValueProps, LoginProps, DyCreateCustomerProps, serviceCreationProps, GstTypeProps, TdsTaxProps, SendEmailInitialValueProps, PaymentTermsProps, ArAgingInitialValueProps, InvoicesInitialValueProps, RoleInitialValueProps, ChangePasswordInitialValueProps, InvoiceMailReasonProps, AdminCompanyUsersInitialValueProps, SuperAdminUsersInitialValueProps, } from "../../types/types";
import { format } from "path";

export const loginInitialValue: LoginProps = {
    userEmail: "",
    // username: "",
    password: "",
}

// 
export const superAdminCompanyUsersInitialValues: SuperAdminUsersInitialValueProps = {
    // * ---------- user registration ----------
    id: "",
    userName: "",
    userEmail: "",
    password: "",
    userRole: "",
    userMobile: "",
    description: "",
    // companyName: "Marvel",
    // * ---------- company information ----------
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyCountry: "",
    companyCity: "",
    companyState: "",
    companyAddress: "",
    companyWebsite: "",
    companyTaxNumber: "",
    companyRegNumber: "",
    // * ----------user configuration ----------
    customerLimit:"",
    invoiceLimit:"",
    userLimit:"",
    serviceLimit:"",
};
export const adminCompanyUsersInitialValues: AdminCompanyUsersInitialValueProps = {
    // * ---------- user registration ----------
    id: "",
    userName: "",
    userEmail: "",
    password: "",
    userRole: "",
    userMobile: "",
    description: "",
};

export const customerInitialValues = {
    customerType: "",
    customerName: "",
    companyName: "",
    customerEmail: "",
    customerPhone: "",
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    contactPersons: [{
        contactName: '',
        contactEmail: '',
        contactPhone: '',
    },],
};

export const serviceInitialValues = {
    serviceAccountingCode: "",
    serviceDescription: "",
    serviceAmount: "",
};
export const linkInitialValues = {
    label: "",
    url: "",
    description: "",
};
export const gstTypeInitialValue: GstTypeProps = {
    gstName: "",
    gstPercentage: 0,
};

const fromMail = localStorage.getItem("userEmail");
console.log("fromMail", fromMail);

export const invoiceMailReasonInitialValue: InvoiceMailReasonProps = {
    fromMail: fromMail || "",
    toMail: "",
    reason: "",
};

export const tdsTaxInitialValue: TdsTaxProps = {
    taxName: "",
    taxPercentage: 0,
};

export const paymentTermsInitialValue: PaymentTermsProps = {
    termName: "",
    totalDays: 0,

};

export const dyCustomerInitialValue: DyCreateCustomerProps = {
    customerName: "asasa",
    customerType: "",
    companyName: "",
    customerEmail: "",
    customerPhone: 0,
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    contactPerson: [
        {
            contactName: "wewe",
            contactEmail: "",
            contactPhone: 0,
        }
    ],
};
export const dyserviceInitialValues: serviceCreationProps = {
    serviceAccountingCode: "",
    serviceDescription: "",
    serviceAmount: 0,
};

//

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
}

const currentDate = new Date();
const defaultInvoiceType = `IMS-${formatDate(currentDate)}`;

export const invoiceCreateInitialValue: InvoiceInitialValueProps = {
    invoiceDate: new Date(),
    invoiceType: "",
    invoiceNumber: defaultInvoiceType,
    customerName: "",
    gstType: "",
    gstPercentage: null,
    gstInNumber: "",
    paymentTerms: "",
    startDate: '',
    dueDate: '',
    invoiceStatus: "DRAFT",
    discountPercentage: null,
    totalAmount: null,
    notes: "Thanks for your business transaction",
    termsAndConditions: "",
    taxAmount: {
        tds: "",
    },
    servicesList: [],
};

export const invoiceEditInitialValue: InvoiceInitialValueProps = {
    id: "",
    invoiceDate: new Date(),
    invoiceType: "",
    invoiceNumber: "",
    customerName: "",
    gstType: "",
    gstPercentage: null,
    gstInNumber: "",
    paymentTerms: "",
    startDate: '',
    dueDate: '',
    invoiceStatus: "PENDING",
    discountPercentage: null,
    totalAmount: null,
    notes: "Thanks for your business transaction",
    termsAndConditions: "",
    taxAmount: {
        tds: "",
    },
    servicesList: [],
};
export const invoicesInitialValue: InvoicesInitialValueProps = {

   // invoiceDate: "",
    startDate: '',
    endDate: '',
    filter: "invoiceReport",
};

export const AragingInitialValue: ArAgingInitialValueProps = {
   // invoiceDate: "",
    startDate: "",
    endDate: "",
    filter: "agingReport",

};

export const SendEmailInitialValue: SendEmailInitialValueProps = {
    recipientEmail: "",
    fromemail: "",
    file: null,
    cc: "",
    subject: "",
}

export const RoleInitialValue: RoleInitialValueProps = {
    id: "",
    userName: "",
    userRole: "",
    userEmail: "",
    userAccess: "",
    password: "",
    userMobile: "",
    description: "",
}

export const ChangePasswordInitialValue: ChangePasswordInitialValueProps = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    userName: "",
}