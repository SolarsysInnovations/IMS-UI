export interface createClientProps {
    primaryContact: string;
    type: string;
    companyName: string;
    customerEmail: string;
    phoneNumber: number;
    paymentTerms: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    contactName: string;
    contactEmail: string;
    contactPhone: number;
};

const formInitialValues: createClientProps = {
    primaryContact: "",
    type: "",
    companyName: "",
    customerEmail: "",
    phoneNumber: 0,
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: 0,
};

export default formInitialValues;
