import React, { createContext, useContext, useMemo, useState } from 'react';
import { gstTypeInitialValue } from '../constants/forms/formikInitialValues';
import { GstTypeProps } from '../types/types';

interface TaxConfigContextType {
  gstTypeConfig: {
    gstType: GstTypeProps;
    setGstTypeData: React.Dispatch<React.SetStateAction<GstTypeProps>>;
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
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const taxConfigValue = useMemo(
    () => ({
      gstTypeConfig: {
        gstType: gstTypeData,
        setGstTypeData,
      },
      mode: mode,
      setMode,
    }),
    [gstTypeData, mode],
  );

  return (
    <TaxConfigContext.Provider value={taxConfigValue}>
      {children}
    </TaxConfigContext.Provider>
  );
}

export { useTaxConfigContext, TaxConfigProvider };
