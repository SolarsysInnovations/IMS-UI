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
        <Grid container spacing={4}>
    {Object.entries(details).map(([key, value], index) => (
        <Grid item xs={12} sm={6} key={index}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        <strong>{key}:</strong>
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    {Array.isArray(value) ? (
                        value.map((item, index) => (
                            <Box key={index} mb={2}>
                                {Object.entries(item).map(([subKey, subValue]) => (
                                    <Grid container spacing={2} key={subKey}>
                                        <Grid item xs={4}>
                                            <Typography variant="body2">
                                                <strong>{subKey}:</strong>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="body2">
                                                {subValue as string}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2">
                            {value as string}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    ))}
</Grid>);

}

export default CustomerDetails;


