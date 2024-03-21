import React, { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material';

interface CustomerDetailsProps {
    details: any;
}

const CustomerDetails = ({ details }: CustomerDetailsProps) => {
    return (
        <Grid container spacing={2}>
            {Object.entries(details).map(([key, value]) => (
                <Grid item xs={6}>
                    <Typography variant="subtitle2" color="initial">
                        {key} : <Typography variant="body2" component="span" >{value as ReactNode}</Typography>
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}

export default CustomerDetails