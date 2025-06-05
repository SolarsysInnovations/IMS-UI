import { useSelector } from 'react-redux';
import PaymentTermsList from './PaymentTermsList';
import { useEffect, useState } from 'react';
import PaymentTermsForm from './PaymentTermsCreate';

const PaymentTermsScreen: React.FC = () => {
  const paymentTermsValue = useSelector(
    (state: any) => state.paymentTermsState.data,
  );
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [paymentTermsValue]);

  return (
    <>
      <PaymentTermsForm key={key} paymentTermsValue={paymentTermsValue} />
      <PaymentTermsList />
    </>
  );
};

export default PaymentTermsScreen;
