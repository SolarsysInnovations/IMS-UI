import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

export default function InvoiceStatus() {
    return (
        <Box sx={{
            // border: "1px solid #f1ecec",
            justifyContent: "center",
            display: "flex",
            borderRadius: "15px",
            padding: "10px 0px",
            backgroundColor: "#fff",
            marginTop: "10px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}>
            <Box>
                <Typography variant="caption" >Invoice Status</Typography>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 30, label: 'paid', color: "#03C988" },
                                { id: 1, value: 20, label: 'approved', color: "#6366F1" },
                                { id: 2, value: 20, label: 'pending', color: "#ECB365" },
                                { id: 3, value: 20, label: 'returned', color: "#1597BB" },
                                { id: 4, value: 20, label: 'draft', color: "#EEEEEE" },
                                { id: 5, value: 20, label: 'deleted', color: "#D21312" },
                            ],
                            innerRadius: 50,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -180,
                            endAngle: 180,
                            cx: 100,
                            cy: 100,

                        },
                    ]}
                    width={350}
                    height={220}

                />
            </Box>
        </Box>
    );
}
