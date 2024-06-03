import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card, CardContent, Typography } from '@mui/material';

const InvoiceStatus = () => {
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

    return (
        <>
            <Card sx={{ width: "300px", height: "200px" }}>
                <Typography sx={{ ml: 3, mt: 1 }} color="inherit" variant="body2">Invoice Status</Typography>
                <div id="chart" style={{ padding: "0px", marginTop: "10px" }}>

                    <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
                </div>
                <div id="html-dist"></div>
            </Card>
        </>
    );
};

export default InvoiceStatus;
