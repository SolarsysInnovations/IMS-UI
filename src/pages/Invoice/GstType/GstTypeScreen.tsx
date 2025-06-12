import GstTypeList from './GstTypeList';
import GstTypeForm from './GstTypeCreate';
import { useEffect, useState } from 'react';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

const GstTypeScreen: React.FC = () => {
  const context = useTaxConfigContext();
  const gstValue = context.gstTypeConfig.gstType;
  const mode = context.mode;
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setKey((prevKey: number) => prevKey + 1);
  }, [gstValue]);

  return (
    <>
      <GstTypeForm key={key} mode={mode} gstTypeValue={gstValue} />
      <GstTypeList />
    </>
  );
};

export default GstTypeScreen;
