import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card } from '@mui/material';

const AdminDashboardInvoicePieChart = ({ invoicePieChartData }: any) => {

    const [chartData, setChartData] = useState<{
        series: number[];
        options: any;
    }>({
        series: [],
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
                                formatter: (w: any) => {
                                    const total = w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0);
                                    return total;
                                },
                            },
                        },
                    },
                },
            },
            stroke: {
                width: 0,
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#F97300', '#FFD700', '#4E9F3D', '#4ECCA3', '#FF204E', '#FF204E', "#00224D"],
            labels: ["Returned", "Pending", "Approved", "Draft", "Deleted", "MAILED", "Paid"],
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

    useEffect(() => {
        if (invoicePieChartData) {
            const { pending, approved, returned, deleted, draft, mailed, paid } = invoicePieChartData;

            setChartData({
                series: [
                    returned.noOfInvoices,
                    pending.noOfInvoices,
                    approved.noOfInvoices,
                    draft.noOfInvoices,
                    deleted.noOfInvoices,
                    mailed.noOfInvoices,
                    paid.noOfInvoices
                ],
                options: {
                    ...chartData.options,
                    labels: [
                        'Returned',
                        'Pending',
                        'Approved',
                        'Draft',
                        'Mailed',
                        'Paid',
                    ]
                }
            });
        }
    }, [invoicePieChartData]);

    return (
        <Card sx={{ width: "300px", height: "160px" }}>
            <div id="chart" style={{ padding: "0px", marginTop: "px" }}>
                <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
            </div>
        </Card>
    );
};

export default AdminDashboardInvoicePieChart;
