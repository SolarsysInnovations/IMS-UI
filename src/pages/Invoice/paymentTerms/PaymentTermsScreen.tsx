import PaymentTermsCreate from "./PaymentTermsCreate";
import PaymentTermsList from "./PaymentTermsList";

const PaymentTermsScreen: React.FC = () => {

    return (
        <>
            <PaymentTermsCreate />
            <PaymentTermsList />
        </>
    );
};

export default PaymentTermsScreen;
