import React from 'react'
import Typography from '@mui/material/Typography'
import InvoiceStatus from './InvoiceStatusChart'
import { Grid } from '@mui/material'

const Dashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <h1>hello</h1>
            </Grid>
            <Grid item xs={4}>
                <InvoiceStatus />
            </Grid>
        </Grid>

    )
}

export default Dashboard