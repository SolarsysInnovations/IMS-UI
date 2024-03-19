import * as Yup from 'yup';

export const validationSchema = Yup.object({
    primaryContact: Yup.string()
        .max(255)
        .required('primaryContact is required'),
    type: Yup.string()
        .max(255)
        .required('type is required'),
    companyName: Yup.string()
        .max(255)
        .required('companyName is required'),
    customerEmail: Yup.string()
        .max(255)
        .required('customerEmail is required'),
    phoneNumber: Yup.number()
        .min(8, "too short")
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
    zipCode: Yup.string()
        .max(255)
        .required('zipCode is required'),
    contactName: Yup.string()
        .max(255)
        .required('contactName is required'),
    contactEmail: Yup.string()
        .max(255)
        .required('contactEmail is required'),
    contactPhone: Yup.number()
        .min(8, "too short")
        .required('phoneNumber is required'),
});