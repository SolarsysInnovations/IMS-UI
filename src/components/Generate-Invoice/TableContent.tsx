import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    code: string,
    description: string,
    qty: number,
    rate: number,
    amount: number,
) {
    return { code, description, qty, rate, amount };
}
interface TableContentUiProps {
    tableData?: any;
}

const tableRow = [
    {
        headName: "Accounting Code",
        align: "left",
    },
    {
        headName: "Service Amount",
        align: "left",
    },
    {
        headName: "quantity",
        align: "left",
    },
    {
        headName: "total price",
        align: "right",
    },

]
export default function TableContent({ tableData }: TableContentUiProps) {
    console.log(tableData);

    return (
        <TableContainer sx={{
            "& .css-7u7gjs-MuiPaper-root-MuiTableContainer-root": {
                boxShadow: "none !important",
                backgroundColor: "red",
            }
        }} component={Paper}>
            <Table sx={{
                "& .css-7u7gjs-MuiPaper-root-MuiTableContainer-root": {
                    boxShadow: "none"
                }
            }}>
                <TableHead>
                    <TableRow>
                        {tableRow.map((data) => (
                            <TableCell align={data.align as "left" | "right" | "center" | "justify" | "inherit" | undefined} key={data.headName}>
                                {data.headName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.servicesList?.map((data: any) => (
                        <TableRow
                            key={data.id}
                        >
                            <TableCell >{data.serviceAccountingCode}</TableCell>
                            <TableCell align="left">{data.serviceAmount}</TableCell>
                            <TableCell align="left">{data.quantity}</TableCell>
                            <TableCell align="right">{data.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}