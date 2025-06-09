import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  gstTypeInitialValue,
  paymentTermsInitialValue,
  tdsTaxInitialValue,
} from '../constants/forms/formikInitialValues';
import { GstTypeProps, PaymentTermsProps, TdsTaxProps } from '../types/types';

interface TaxConfigContextType {
  gstTypeConfig: {
    gstType: GstTypeProps;
    setGstTypeData: React.Dispatch<React.SetStateAction<GstTypeProps>>;
  };
  paymentTermsConfig: {
    paymentTerms: PaymentTermsProps;
    setPaymentTermsData: React.Dispatch<
      React.SetStateAction<PaymentTermsProps>
    >;
  };
  tdsTaxConfig: {
    taxName: TdsTaxProps;
    setTdsTaxData: React.Dispatch<React.SetStateAction<TdsTaxProps>>;
  };
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
}

const TaxConfigContext = createContext<TaxConfigContextType | undefined>(
  undefined,
);

const useTaxConfigContext = () => {
  const context = useContext(TaxConfigContext);
  if (!context) {
    throw new Error(
      'useTaxConfigContext must be used within a TaxConfigProvider',
    );
  }
  return context;
};

function TaxConfigProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [gstTypeData, setGstTypeData] =
    useState<GstTypeProps>(gstTypeInitialValue);
  const [paymentTermsData, setPaymentTermsData] = useState<PaymentTermsProps>(
    paymentTermsInitialValue,
  );
  const [tdsTaxData, setTdsTaxData] = useState(tdsTaxInitialValue);
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const taxConfigValue = useMemo(
    () => ({
      gstTypeConfig: {
        gstType: gstTypeData,
        setGstTypeData,
      },
      paymentTermsConfig: {
        paymentTerms: paymentTermsData,
        setPaymentTermsData,
      },
      tdsTaxConfig: {
        taxName: tdsTaxData,
        setTdsTaxData,
      },
      mode: mode,
      setMode,
    }),
    [gstTypeData, paymentTermsData, tdsTaxData, mode],
  );

  return (
    <TaxConfigContext.Provider value={taxConfigValue}>
      {children}
    </TaxConfigContext.Provider>
  );
}

export { useTaxConfigContext, TaxConfigProvider };
