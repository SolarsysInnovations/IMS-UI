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


export default function TableContent({ tableData }: TableContentUiProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>serviceAccountingCode</TableCell>
                        <TableCell align="right">serviceAmount </TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">totalAmount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.servicesList?.map((data: any) => (
                        <TableRow
                            key={data.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {data.serviceAccountingCode}
                            </TableCell>
                            <TableCell align="right">{data.serviceAmount}</TableCell>
                            <TableCell align="right">{data.qty}</TableCell>
                            <TableCell align="right">{data.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}