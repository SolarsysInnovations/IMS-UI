import { useEffect, useState } from 'react';
import TdsTaxCreate from './TdsTaxCreate';
import TdsTaxList from './TdsTaxList';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

const TdsTaxScreen: React.FC = () => {
  const context = useTaxConfigContext();
  const tdsTaxValue = context.tdsTaxConfig.taxName;
  const mode = context.mode;
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [tdsTaxValue]);

  const handleClose = () => {};

  return (
    <>
      <TdsTaxCreate
        key={key}
        tdsTaxValue={tdsTaxValue}
        onClose={handleClose}
        mode={mode}
      />
      <TdsTaxList />
    </>
  );
};

export default TdsTaxScreen;
