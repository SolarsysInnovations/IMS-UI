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

const rows = [
    createData('234324', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, inventore?", 6.0, 24, 4.0),
    createData('43667', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, inventore?", 9.0, 37, 4.3),
    createData('12343', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, inventore?", 16.0, 24, 6.0),

];

export default function TableContent() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Item & Description </TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Rate</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.code}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.rate}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}