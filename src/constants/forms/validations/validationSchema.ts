import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    // email: Yup.string()
    //     .email('Must be a valid email')
    //     .max(255)
    //     .required('Email is required'),
    username: Yup.string()
        .required('Email is required'),
    password: Yup.string()
        .max(255)
        .required('Password is required'),
});

export const invoiceValidationSchema = Yup.object({
    invoiceType: Yup.string()
        .max(255)
        .required('invoiceType is required'),
    invoiceNumber: Yup.string()
        .max(255)
        .required('type is required'),
    customerName: Yup.string()
        .max(255)
        .required('companyName is required'),
    gstType: Yup.string()
        .max(255)
        .required('customerEmail is required'),
    gstPercentage: Yup.number()
        .min(0, 'gstPercentage must be a positive number')
        .max(999, 'gstPercentage must be a three-digit number')
        .required('gstPercentage is required'),
    invoiceDate: Yup.string()
        .max(255)
        .required('paymentTerms is required'),
    gstInNumber: Yup.string()
        .max(255)
        .required('country is required'),
    discountAmount: Yup.string()
        .max(255)
        .required('country is required'),
    paymentTerms: Yup.string()
        .max(255)
        .required('address is required'),
    dueDate: Yup.string()
        .max(255)
        .required('city is required'),
    notes: Yup.string()
        .max(255)
        .required('notes is required'),
    // invoiceStatus: Yup.string()
    //     .max(255)
    //     .required('state is required'),
    service: Yup.array()
        .min(1, "At least one service must be selected")
        .of(Yup.string())
        .required("services is required"),
});

export const customerValidationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    customerEmail: Yup.string().email('Invalid email').required('Customer Email is required'),
    customerPhone: Yup.string().required('Customer Number is required'),
    paymentTerms: Yup.string().required('Payment Terms is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pinCode: Yup.string().required('Pin Code is required'),
    contactPersons: Yup.array().of(
        Yup.object().shape({
            contactName: Yup.string().required('Contact Person Name is required'),
            contactEmail: Yup.string().email('Invalid email').required('Contact Person Email is required'),
            contactPhone: Yup.string().required('Contact Person Phone is required'),
        })
    ).min(1, 'At least one contact person is required'),
});

export const serviceValidationSchema = Yup.object().shape({
    serviceAccountingCode: Yup.string().required('Service Accounting Code is required'),
    serviceDescription: Yup.string().required('Description is required'),
    serviceAmount: Yup.string().required('Amount is required'),
});
export const linkValidationSchema = Yup.object().shape({
    link: Yup.string().required('Link is required'),
    url: Yup.string().required('URL is required'),
    description: Yup.string().required('Description is required'),
});
export const companyValidationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyAddress: Yup.string().required('Company Address is required'),
    companyState: Yup.string().required('Company State is required'),
    companyCountry: Yup.string().required('Company Country is required'),
    companyEmail: Yup.string().required('Company Email is required'),
    companyPhone: Yup.string().required('Company Phone is required'),
    companyCell: Yup.string().required('Company Cell is required'),
    companyWebsite: Yup.string().required('Company Website is required'),
    companyTaxNumber: Yup.string().required('Company Tax Number is required'),
    companyRegNumber: Yup.string().required('Company Reg Number is required'),

});
export const gstTypeValidationSchema = Yup.object().shape({
    gstName: Yup.string().required('gstName is required'),
    // gstPercentage: Yup.number()
    //     .min(0, 'gstPercentage must be a positive number')
    //     // .max(999, 'gstPercentage must be a three-digit number')
    //     .required('gstPercentage is required'),
});

export const tdsTaxValidationSchema = Yup.object().shape({
    taxName: Yup.string().required('taxName is required'),
    // gstPercentage: Yup.number()
    //     .min(0, 'gstPercentage must be a positive number')
    //     // .max(999, 'gstPercentage must be a three-digit number')
    //     .required('gstPercentage is required'),
});

export const paymentTermsValidationSchema = Yup.object().shape({
    termName: Yup.string().required('taxName is required'),
    totalDays: Yup.number()
        .min(0, 'totalDays must be a positive number')
        .max(365, 'totalDays must be a three-digit number')
        .required('totalDays is required'),
});

export const sendEmailValidationSchema = Yup.object().shape({
//   fromemail: Yup.string()
//     .email("Invalid email address")
//     .required("From Email is required"),
  recipientEmail: Yup.string()
    .email("Invalid email address")
    .required("To Email is required"),
});

export const RoleValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    userEmail: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .max(255)
        .required('Password is required'),
});