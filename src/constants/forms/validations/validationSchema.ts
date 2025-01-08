import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    userEmail: Yup.string()
        .email('Must be a valid email')
        .max(255, 'Email must be at most 255 characters')
        .required('Email is required')
        .test(
            'valid-domain',
            'Invalid email domain',
            (value) => {
                const forbiddenDomains = ['email.com'];
                if (value) {
                    const domain = value.split('@')[1];
                    return !forbiddenDomains.includes(domain);
                }
                return true;
            }
        ),
    // username: Yup.string()
    //     .required('Email is required'),
    password: Yup.string()
        .max(255)
        .required('Password is required'),
});

export const forgetPwdValidationSchema = Yup.object({
    userEmail: Yup.string()
        .email('Must be a valid email')
        .max(255, 'Email must be at most 255 characters')
        .required('Email is required')
        .test(
            'valid-domain',
            'Invalid email domain',
            (value) => {
                const forbiddenDomains = ['email.com'];
                if (value) {
                    const domain = value.split('@')[1];
                    return !forbiddenDomains.includes(domain);
                }
                return true;
            }
        ),
});

export const invoiceValidationSchema = Yup.object({
    invoiceType: Yup.string()
        .max(255)
        .required('Invoice Type is required*'),
    invoiceNumber: Yup.string()
        .max(255)
        .required('type is required'),
    customerName: Yup.string()
        .max(255)
        .required('Company Name is required'),
    gstType: Yup.string()
        .max(255)
        .required('Customer Email is required'),
    gstPercentage: Yup.number()
        .min(0, 'gstPercentage must be a positive number')
        .max(999, 'gstPercentage must be a three-digit number')
        .required('GST Percentage is required'),
    // invoiceDate: Yup.string()
    //     .max(255)
    //     .required('paymentTerms is required'),
    gstInNumber: Yup.string()
        .max(255)
        .required('Country is required'),
    // paymentTerms: Yup.string()
    //     .max(255)
    //     .required('Payment is required'),
    startDate: Yup.string()
        .required('Due date is required')
    // notes: Yup.string()
    //     .max(255)
    //     .required('notes is required'),
    // // invoiceStatus: Yup.string()
    // //     .max(255)
    // //     .required('state is required'),
    // service: Yup.array()
    //     .min(1, "At least one service must be selected")
    //     .of(Yup.string())
    //     .required("services is required"),
});

export const customerValidationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    customerEmail: Yup.string().email('Invalid email').required('Customer Email is required'),
    customerPhone: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Customer Number is required'),
    // paymentTerms: Yup.string().required('Payment Terms is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    // pinCode: Yup.string().required('Pin Code is required'),
    contactPersons: Yup.array().of(
        Yup.object().shape({
            // contactName: Yup.string().required('Contact Person Name is required'),
            // contactEmail: Yup.string().email('Invalid email').required('Contact Person Email is required'),
            // contactPhone: Yup.string().required('Contact Person Phone is required'),
        })
    ).min(1, 'At least one contact person is required'),
});

export const serviceValidationSchema = Yup.object().shape({
    serviceAccountingCode: Yup.string().required('Accounting Code is required'),
    // serviceDescription: Yup.string().required('Description is required'),
    serviceAmount: Yup.string().required('Amount is required'),
});
export const linkValidationSchema = Yup.object().shape({
    label: Yup.string().required('Link is required'),
    url: Yup.string().required('URL is required'),
    // description: Yup.string().required('Description is required'),
});
export const companyValidationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyAddress: Yup.string().required('Company Address is required'),
    companyCity: Yup.string().notRequired(),
    companyState: Yup.string().required('Company State is required'),
    companyCountry: Yup.string().required('Company Country is required'),
    companyEmail: Yup.string().email('Invalid email format').required('Company Email is required'),
    companyPhone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Company Phone is required'),
    companyCell: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .notRequired(),
    companyWebsite: Yup.string().required('Company Website is required'),
    companyTaxNumber: Yup.string().required('Company Tax Number is required'),
    companyRegNumber: Yup.string().required('Company Reg Number is required'),
    companyRegisterDate: Yup.string().notRequired(),
    userName: Yup.string().required('User Name is required'),
    userEmail: Yup.string().email('Invalid email format').required('User Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required'),
    userRole: Yup.string().required('User role is required'),
    userMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('User mobile is required'),
    userAccess: Yup.string().notRequired(),
});

export const companyDetailsValidationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyAddress: Yup.string().required('Company Address is required'),
    companyCity: Yup.string().notRequired(), // Add this if it's optional
    companyState: Yup.string().required('Company State is required'),
    companyCountry: Yup.string().required('Company Country is required'),
    companyEmail: Yup.string().email('Invalid email format').required('Company Email is required'),
    companyPhone:  Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Company Phone is required'),
    companyCell: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Company Cell is required'), // Change if optional
    companyWebsite: Yup.string().required('Company Website is required'),
    companyTaxNumber: Yup.string().required('Company Tax Number is required'),
    companyRegNumber: Yup.string().required('Company Reg Number is required'),
    companyRegisterDate: Yup.string().notRequired(),
    userName: Yup.string().required('User Name is required'),
    userEmail: Yup.string().email('Invalid email format').required('User Email is required'),
    password:  Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    userRole: Yup.string().required('User role is required'),
    userMobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('User mobile is required'),
    userAccess: Yup.string().notRequired(), // Change if required
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

export const InvoiceEmailReasonValidationSchemas = Yup.object().shape({
    fromMail: Yup.string().email('Invalid email format').required('Required'),
    toMail: Yup.string().email('Invalid email format').required('Required'),
    reason: Yup.string().required('Required')
});

export const paymentTermsValidationSchema = Yup.object().shape({
    termName: Yup.string().required('taxName is required'),
    totalDays: Yup.number()
        .min(0, 'totalDays must be a positive number')
        .max(365, 'totalDays must be a three-digit number')
        .required('totalDays is required'),
});

// export const sendEmailValidationSchema = Yup.object().shape({
//     //   fromemail: Yup.string()
//     //     .email("Invalid email address")
//     //     .required("From Email is required"),
//     recipientEmail: Yup.string()
//         .email("Invalid email address")
//         .required("To Email is required"),
// });

export const RoleValidationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required'),
    userRole: Yup.string().required('User role is required'),
    userMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
});


export const PasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .required('Current Password is required')
        .max(255),
    newPassword: Yup.string()
        .min(8, 'New Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'New Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'New Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'New Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'New Password must contain at least one special character')
        .required('New Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Confirm Password must match New Password')
        .required('Confirm Password is required'),
});