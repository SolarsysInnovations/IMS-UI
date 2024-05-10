import * as React from 'react';

interface TableRow {
    headName: string;
    align: "left" | "right" | "center" | "justify" | undefined;
}

interface TableContentUiProps {
    tableData?: any;
}

const tableRow: TableRow[] = [
    {
        headName: "Accounting Code",
        align: "left",
    },
    {
        headName: "Service Amount",
        align: "left",
    },
    {
        headName: "Quantity",
        align: "left",
    },
    {
        headName: "Total Price",
        align: "right",
    },
];

export default function TableContent({ tableData }: TableContentUiProps) {
    console.log(tableData);

    return (
        <div style={{ boxShadow: "none", backgroundColor: "transparent" }}>
            <table style={{ boxShadow: "none", width: "100%" }}>
                <thead>
                    <tr>
                        {tableRow.map((data, index) => (
                            <th
                                key={index}
                                style={{
                                    fontSize: "10px",
                                    backgroundColor: "#343232",
                                    padding: "7px 16px",
                                    color: "#ededed",
                                }}
                                align={data.align}
                            >
                                {data.headName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.servicesList?.map((data: any, index: number) => (
                        <tr key={index}>
                            <td style={{ fontSize: "10px", padding: "10px 16px" }}>{data.serviceAccountingCode}</td>
                            <td style={{ fontSize: "10px", padding: "10px 16px" }}>{data.serviceAmount}</td>
                            <td style={{ fontSize: "10px", padding: "10px 16px" }}>{data.quantity}</td>
                            <td style={{ fontSize: "10px", padding: "10px 16px", textAlign: "right" }}>{data.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
