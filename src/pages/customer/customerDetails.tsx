import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';

interface CustomerDetailsProps {
    details: Record<string, any>;
}

const CustomerDetails = ({ details }: CustomerDetailsProps) => {
    console.log('CustomerDetails:', details);

    if (Object.keys(details).length === 0) {
        return <div>No details available</div>;
    }

    return (
        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
       
        <Grid container spacing={3}>
          {Object.entries(details).map(([key, value], index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="body2" color="text.secondary">
                {key}
              </Typography>
              <Typography variant="subtitle2"  color="textSecondary">
                {Array.isArray(value) 
                  ? value.map((item, i) => (
                      <Box key={i} mb={2}>
                        {Object.entries(item).map(([subKey, subValue]) => (
                          <div key={subKey}>
                            {subValue as string}
                          </div>
                        ))}
                      </Box>
                    ))
                  : value as string
                }
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>);

}

export default CustomerDetails;


