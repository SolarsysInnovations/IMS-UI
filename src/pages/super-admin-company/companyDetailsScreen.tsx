import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface CompanyDetailsProps {
  details?: any;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ details }) => {
  const [mergedData, setMergedData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (details.companyDetails && details.userDetails) {
      const mergedObject = {
        ...details.userDetails,
        ...details.companyDetails,
      };
      setMergedData(mergedObject);
    }
  }, [details]);

  if (!details.companyDetails || !details.userDetails) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      {Object.entries(mergedData).map(([key, value], index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">
                <strong>{key}:</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">{value as string}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompanyDetails;
