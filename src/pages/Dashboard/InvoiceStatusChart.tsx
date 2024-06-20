import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Grid, Typography } from '@mui/material';
import SelectDropdown from '../../components/ui/SelectDropdown';
import { useGetDashboardMutation } from '../../redux-store/dashboard/dashboardApi'; 

interface ValueProps {
    label: string;
    value: string;
}

interface FilterValueProps {
    filter: string;
}

const InvoiceStatus = () => {
    const [selectedValue, setSelectedValue] = useState<ValueProps>({ label: "monthly", value: "monthly" });
    const [selectedFilterValue, setSelectedFilterValue] = useState<FilterValueProps>({ filter: "monthly" });
    const [getDashboard, { data: dashboardGet }] = useGetDashboardMutation(); 
    const [totalValue, setTotalValue] = useState(0); 
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
                                formatter: () => '', 
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
            colors: ['#F97300', '#FFD700', '#4E9F3D', '#4ECCA3', '#FF204E'],
            labels: ["Returned", "Pending", "Approved", "Draft", "Deleted"],
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
        const fetchDashboardData = async () => {
            const result = await getDashboard(selectedFilterValue);
            if (result && result.data) {
                const processedData = processInvoiceStatusData(result.data);
                console.log("Processed Data:", processedData);
                setTotalValue(processedData.total); 
                console.log("totalValue",processedData.total);
                setChartData((prevChartData) => ({
                    series: [
                        processedData.returned,
                        processedData.pending,
                        processedData.approved,
                        processedData.draft,
                        processedData.deleted,
                    ],
                    options: {
                        ...prevChartData.options,
                        plotOptions: {
                            ...prevChartData.options.plotOptions,
                            pie: {
                                ...prevChartData.options.plotOptions?.pie,
                                donut: {
                                    ...prevChartData.options.plotOptions?.pie?.donut,
                                    labels: {
                                        ...prevChartData.options.plotOptions?.pie?.donut?.labels,
                                        total: {
                                            ...prevChartData.options.plotOptions?.pie?.donut?.labels?.total,
                                            formatter: () => totalValue.toString()
                                        },
                                    },
                                },
                            },
                        },
                    },
                }));
            } else {
                console.error('Failed to fetch dashboard data:', result);
            }
        };

        fetchDashboardData();
    }, [selectedFilterValue, getDashboard, totalValue]);

    const handleChange = (newValue: ValueProps | null) => {
        if (newValue) {
            console.log('Selected value changed:', newValue);
            setSelectedValue(newValue);
            setSelectedFilterValue({ filter: newValue.value });
        }
    };

    const processInvoiceStatusData = (data: any) => {
        const invoiceStatusData = data.invoiceStatus || {};
        const series = {
            returned: invoiceStatusData.returned?.noOfInvoices || 0,
            pending: invoiceStatusData.pending?.noOfInvoices || 0,
            approved: invoiceStatusData.approved?.noOfInvoices || 0,
            draft: invoiceStatusData.draft?.noOfInvoices || 0,
            deleted: invoiceStatusData.deleted?.noOfInvoices || 0,
        };
        const total = Object.values(series).reduce((acc: number, val: number) => acc + val, 0);
        return { ...series, total };
    };

    const options = [
        { label: "monthly", value: "monthly" },
        { label: "weekly", value: "weekly" },
        { label: "yearly", value: "yearly" },
    ];

    return (
        <>
            <Grid container mb={0.5}>
                <Grid item xs={4}>
                    <Typography sx={{}} color="inherit" variant="subtitle2">Invoice Status</Typography>
                </Grid>
                <Grid item xs={8} pr={5} sx={{ display: "flex", justifyContent: "right" }}>
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
            </Card>
        </>
    );
};

export default InvoiceStatus;
