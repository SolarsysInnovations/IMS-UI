import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import CustomerCreate from './Customer-create-screen';
import { useQuery } from '@tanstack/react-query';
import { getSingleCustomer } from '../../api/services';
import { useParams } from 'react-router-dom';

const CustomerScreen = () => {
  const [key, setKey] = useState<number>(0);
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['getSingleCustomer', id],
    queryFn: ({ queryKey }) => {
      const customerId = queryKey[1];
      if (!customerId) throw new Error('Customer ID is undefined');
      return getSingleCustomer(customerId);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [data]);

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
    <div>
      <CustomerCreate key={key} customerEditInitialValues={data} />
    </div>
  );
};

export default CustomerScreen;
