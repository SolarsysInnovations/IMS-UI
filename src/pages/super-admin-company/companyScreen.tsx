import { useEffect, useState } from 'react';
import CompanyCreate from './companyCreate';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { getSingleCompany } from '../../api/services';
import { CircularProgress, Grid } from '@mui/material';

const CompanyScreen: React.FC = () => {
  const { id } = useParams();
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [mergedData, setMergedData] = useState<any>(null);
  const [key, setKey] = useState<number>(0);

  const getSingleCompanyMutation = useMutation({
    mutationFn: getSingleCompany,
    onSuccess: (data) => {
      if (data.companyDetails && data.userDetails) {
        const mergedObject = {
          ...data.companyDetails,
          ...data.userDetails,
        };
        setMode('edit')
        setMergedData(mergedObject);
      }
    },
  });

  const isLoading = getSingleCompanyMutation.isPending;

  useEffect(() => {
    if (id) {
      getSingleCompanyMutation.mutate(id);
    }
  }, [id]);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [mergedData]);

  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        height={'100vh'}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      {mode && (
        <CompanyCreate
          key={key}
          companyEditInitialValues={mergedData}
          mode={mode}
        />
      )}
    </>
  );
};

export default CompanyScreen;
