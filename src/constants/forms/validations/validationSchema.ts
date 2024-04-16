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
    serviceAccountingcode: Yup.string().required('Service Accounting Code is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.string().required('Amount is required'),
});

