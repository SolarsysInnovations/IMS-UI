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
        <Grid container spacing={2}>
            {Object.entries(details).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body2">
                                <strong>{key}:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
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
        </Grid>
    );
};

// Default props if details are not passed
CustomerDetails.defaultProps = {
    details: {},
};

export default CustomerDetails;
