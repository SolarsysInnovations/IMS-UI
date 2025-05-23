import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getSingleCustomer } from '../../api/services';

interface CustomerDetailsProps {
  id: string;
}

const labelMapping: Record<string, string> = {
  customerEmail: 'Customer Email',
  customerType: 'Customer Type',
  customerName: 'Customer Name',
  companyName: 'Company Name',
  customerPhone: 'Customer Phone',
  paymentTerms: 'Payment Terms',
  address: 'Address',
  city: 'City',
  state: 'State',
  pinCode: 'Pin Code',
  contactPersons: 'Contact Persons',
  createdBy: 'Created By',
  updatedBy: 'Updated By',
};

const CustomerDetails = ({ id }: CustomerDetailsProps) => {
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

  if (isLoading) return <div>Loading...</div>;
  if (!data || Object.keys(data).length === 0) {
    return <div>No details available</div>;
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        {Object.entries(data).map(([key, value], index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Typography
              variant="body2"
              sx={{ color: 'GrayText', fontWeight: 'bold' }}
            >
              {labelMapping[key] || key}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
              {Array.isArray(value)
                ? value.map((item, i) => (
                    <Box key={i} mb={2}>
                      {Object.entries(item).map(([subKey, subValue]) => (
                        <div key={subKey}>{subValue as string}</div>
                      ))}
                    </Box>
                  ))
                : (value as string)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerDetails;
