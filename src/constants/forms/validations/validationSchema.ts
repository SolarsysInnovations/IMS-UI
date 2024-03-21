import * as Yup from 'yup';

export const validationSchema = Yup.object({
    invoiceType: Yup.string()
        .max(255)
        .required('primaryContact is required'),
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