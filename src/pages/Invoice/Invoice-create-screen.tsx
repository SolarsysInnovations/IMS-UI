import React, { useEffect, useState } from 'react';
import InvoiceFormScreen from './InvoiceFormScreen';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleInvoice } from '../../api/services';

const InvoiceCreateScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [key, setKey] = useState<number>(0);

  const { data: invoiceValue } = useQuery({
    queryKey: ['getSingleInvoice', id],
    queryFn: ({ queryKey }) => {
      const inVoiceId = queryKey[1];
      if (!inVoiceId) throw new Error('Invoice ID is undefined');
      return getSingleInvoice(inVoiceId);
    },
  });

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [invoiceValue]);

  return <InvoiceFormScreen key={key} invoiceValue={invoiceValue} />;
};

export default InvoiceCreateScreen;
