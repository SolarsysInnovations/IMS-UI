import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card, Grid, Typography } from '@mui/material';
import SelectDropdown from '../../components/ui/SelectDropdown';

const InvoiceStatus = () => {
    const [selectedValue, setSelectedValue] = React.useState({ label: "monthly", value: "monthly" });

    const handleChange = (newValue: any) => {
        console.log(newValue);
        setSelectedValue(newValue);
    };
    const [chartData, setChartData] = useState<{
        series: number[];
        options: ApexOptions;
    }>({
        series: [44, 55, 41, 30, 30],
        options: {
            chart: {
                type: 'donut',

            },
            plotOptions: {

                pie: {

                    startAngle: -90,
                    endAngle: 270,
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total',
                                formatter: () => '198', // Example total
                            },
                        },
                    },
                },
            },
            stroke: {
                width: 0, // Remove the gap between segments
            },
            dataLabels: {
                enabled: false,
            },
            // fill: {
            //     type: 'gradient',
            // },
            colors: ['#F97300', '#FFD700', '#4E9F3D', '#4ECCA3', '#FF204E',],
            labels: ["returned", "Pending", "approved", "draft", "deleted"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300,
                            height: 200
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });
    const options = [
        { label: "monthly", value: "monthly" },
        { label: "weekly", value: "weekly" },
        { label: "yearly", value: "yearly" },
    ]
    return (
        <>
            <Grid container mb={0.5}>
                <Grid item xs={4}>
                    <Typography sx={{}} color="inherit" variant="subtitle2">Invoice Status</Typography>
                </Grid>
                <Grid item xs={8} pr={5} sx={{ display: "flex", justifyContent: "right", }}>
                    <SelectDropdown
                        applySmallSizeStyle={true}
                        value={selectedValue}
                        defaultValue={{ label: "monthly", value: "monthly" }}
                        options={options}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Card sx={{ width: "300px", height: "160px" }}>
                <div id="chart" style={{ padding: "0px", marginTop: "0px" }}>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
                </div>
                <div id="html-dist"></div>
            </Card>
        </>
    );
};

export default InvoiceStatus;
