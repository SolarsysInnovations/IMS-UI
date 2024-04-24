import React, { ReactNode, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material';

interface CustomerDetailsProps {
    details: any;
}

const CustomerDetails = ({ details }: CustomerDetailsProps) => {
    return (
        <Grid container spacing={2}>
            {Object.entries(details).map(([key, value]) => (
                <Grid item sm={6} key={key}>
                    <Typography variant="body2" color="initial">
                        <strong>{key}:</strong>
                        {Array.isArray(value) ? (
                            <>
                                {value?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {Object.entries(item).map(([subKey, subValue]) => (
                                                <div key={subKey}>
                                                    <strong>{subKey}:</strong> {subValue as string}{' '}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <span> {value as string}</span>
                        )}
                    </Typography>
                </Grid>
            ))}
        </Grid>


    )
}

export default CustomerDetails