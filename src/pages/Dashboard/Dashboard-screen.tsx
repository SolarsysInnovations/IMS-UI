import React from 'react'
import Typography from '@mui/material/Typography'
import InvoiceStatus from './InvoiceStatusChart'
import { Grid } from '@mui/material'
import InvoiceAmount from './InvoiceAmount'

const Dashboard = () => {
    return (
        <Grid container spacing={2} px={0}>
            <Grid item xs={8}>
                <InvoiceAmount />
            </Grid>
            <Grid item xs={4} >
                <InvoiceStatus />
            </Grid>
        </Grid>

    )
}

export default Dashboard