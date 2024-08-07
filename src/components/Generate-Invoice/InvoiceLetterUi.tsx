import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef, useState } from 'react';

const InvoiceContent = ({ invoiceData, customerDetails, subTotalAmount, discountAmount }: any) => (
    <div>
        <img
            src="https://picsum.photos/200" // Random placeholder image
            alt="Random"
            style={{ width: "100px", height: "100px", marginBottom: '10px' }}
        />
        <div style={{ margin: 10, padding: 10 }}>
            <h1 style={{ fontSize: 24 }}>INVOICE</h1>
            <h2 style={{ fontSize: 18 }}>SOLARSYS</h2>
            <p style={{ fontSize: 12 }}>Address: 1/305, Thillai Nagar, Trichy 905 606</p>
            <p style={{ fontSize: 12 }}>Phone: 983894833</p>
        </div>
        <div style={{ margin: 10, padding: 10 }}>
            <h2 style={{ fontSize: 18 }}>Billed To</h2>
            <p style={{ fontSize: 12 }}>Name: {customerDetails?.customerName}</p>
            <p style={{ fontSize: 12 }}>Email: {customerDetails?.customerEmail}</p>
            <p style={{ fontSize: 12 }}>Phone: {customerDetails?.customerPhone}</p>
        </div>
        <div style={{ margin: 10, padding: 10 }}>
            <h2 style={{ fontSize: 18 }}>Invoice Details</h2>
            <p style={{ fontSize: 12 }}>Invoice No: {invoiceData?.invoiceNumber}</p>
            <p style={{ fontSize: 12 }}>Payment Terms: {invoiceData?.paymentTerms}</p>
            <p style={{ fontSize: 12 }}>Due Date: 12-23-2024</p>
        </div>
        <div style={{ margin: 10, padding: 10 }}>
            <h2 style={{ fontSize: 18 }}>Items</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Description</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Quantity</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Unit Price</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {invoiceData?.items.map((item: any, index: any) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{item.description}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{item.quantity}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{item.unitPrice}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{item.total}</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
        <div style={{ margin: 10, padding: 10 }}>
            <p style={{ fontSize: 12 }}>Sub total: {subTotalAmount}</p>
            <p style={{ fontSize: 12 }}>Discount Amount: -{discountAmount}</p>
            <p style={{ fontSize: 12 }}>Tax Amount: {/* Add tax amount here */}</p>
        </div>
        <div style={{ margin: 10, padding: 10 }}>
            <p style={{ fontSize: 12 }}>Notes: Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</p>
            <p style={{ fontSize: 12 }}>Terms & Conditions: Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</p>
        </div>
    </div>
);




const InvoiceLetterUi = ({ invoiceData }: any) => {
    const [subTotalAmount, setSubTotalAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [customerDetails, setCustomerDetails] = useState<any>();
    const contentRef = useRef<HTMLDivElement>(null);

    const downloadPDF = () => {
        const input = contentRef.current;
        if (input) {
            html2canvas(input, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');

                // Check if the canvas contains the image
                const img = new Image();
                img.src = imgData;
                img.onload = () => {
                    console.log('Image loaded');
                };
                img.onerror = () => {
                    console.error('Error loading image');
                };

                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 190; // Adjust width to fit content
                const pageHeight = 295; // A4 page height in mm
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const heightLeft = imgHeight;
                const position = 0;

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

                // Save the PDF
                pdf.save('invoice.pdf');
            });
        }
    };


    return (
        <>
            <div ref={contentRef}>
                <InvoiceContent
                    invoiceData={invoiceData}
                    customerDetails={customerDetails}
                    subTotalAmount={subTotalAmount}
                    discountAmount={discountAmount}
                />
            </div>
            <button onClick={downloadPDF}>Download PDF</button>
        </>
    );
}

export default InvoiceLetterUi;