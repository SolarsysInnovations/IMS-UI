import * as Yup from 'yup';

export const validationSchema = Yup.object({
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
    gstPercentage: Yup.string()
        .max(255)
        .required('phoneNumber is required'),
    invoiceDate: Yup.string()
        .max(255)
        .required('paymentTerms is required'),
    gstInNumber: Yup.string()
        .max(255)
        .required('country is required'),
    paymentTerms: Yup.string()
        .max(255)
        .required('address is required'),
    dueDate: Yup.string()
        .max(255)
        .required('city is required'),
    invoiceStatus: Yup.string()
        .max(255)
        .required('state is required'),

});

export const customerValidationSchema = Yup.object({
    customerName: Yup.string()
        .max(255)
        .required('customerName is required'),
    customerType: Yup.string()
        .max(255)
        .required('customerType is required'),
    companyName: Yup.string()
        .max(255)
        .required('companyName is required'),
    customerEmail: Yup.string()
        .max(255)
        .required('customerEmail is required'),
    phoneNumber: Yup.number()
        .required('phoneNumber is required'),
    paymentTerms: Yup.string()
        .max(255)
        .required('paymentTerms is required'),
    country: Yup.string()
        .max(255)
        .required('country is required'),
    address: Yup.string()
        .max(255)
        .required('address is required'),
    city: Yup.string()
        .max(255)
        .required('city is required'),
    state: Yup.string()
        .max(255)
        .required('state is required'),
    pinCode: Yup.string()
        .max(255)
        .required('pinCode is required'),
    contactName: Yup.string()
        .max(255)
        .required('contactName is required'),
    contactEmail: Yup.string()
        .max(255)
        .required('contactEmail is required'),
    contactPhone: Yup.number()
        .required('contactPhone is required'),
});