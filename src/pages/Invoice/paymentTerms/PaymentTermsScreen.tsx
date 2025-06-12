import PaymentTermsList from './PaymentTermsList';
import { useEffect, useState } from 'react';
import PaymentTermsForm from './PaymentTermsCreate';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

const PaymentTermsScreen: React.FC = () => {
  const context = useTaxConfigContext();
  const paymentTermsValue = context.paymentTermsConfig.paymentTerms;
  const mode = context.mode;
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [paymentTermsValue]);

  return (
    <>
      <PaymentTermsForm
        key={key}
        paymentTermsValue={paymentTermsValue}
        mode={mode}
      />
      <PaymentTermsList />
    </>
  );
};

export default PaymentTermsScreen;
