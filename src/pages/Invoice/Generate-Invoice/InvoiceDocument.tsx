import React from 'react';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    fontSize: 50,
    fontWeight: 100,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 10,
  },
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  tableCell: {
    padding: 8,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  divider: {
    borderTop: '1px solid #000',
    marginVertical: 10,
  },
  tableCellLast: {
    borderRight: 'none',
  },
});

// Invoice Document component for PDF
const InvoiceDocument = ({ invoiceData, companyLogo }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: '30px' }}
        >
          <View>
            <Image style={styles.image} src={companyLogo ?? 'loading...'} />
          </View>
          <View>
            <Text style={styles.header}>Invoice</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          <View>
            <Text style={{ fontSize: '16px', marginBottom: '10px' }}>
              Invoice To:
            </Text>
            <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
              {invoiceData?.companyName}{' '}
            </Text>
            <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
              {invoiceData?.customerName}{' '}
            </Text>
            <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
              {invoiceData?.customerEmail}
            </Text>
            <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
              {invoiceData?.customerContact}
            </Text>
          </View>

          <View>
            {/* <Text style={styles.subHeader}>Invoice :</Text> */}
            <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
              Invoice No: {invoiceData?.invoiceNumber}
            </Text>
            <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
              Payment Terms: {invoiceData?.paymentTerms}{' '}
            </Text>
            <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
              Due Date: {invoiceData?.dueDate}
            </Text>
            {invoiceData?.retainerFee && (
              <Text style={{ fontSize: '14px', marginBottom: '5px' }}>
                Retainer Fee: {invoiceData?.retainerFee}
              </Text>
            )}
          </View>
        </View>
        <View style={{ borderTop: '1px solid #000', marginTop: '20px' }}></View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>
              Service Acc Code
            </Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>
              Service Des
            </Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>
              Service Qty
            </Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>
              Service Amount
            </Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>
              Total Amount
            </Text>
          </View>
          <View style={{ borderTop: '1px solid #000' }}></View>
          {/* Example table rows */}
          {invoiceData?.servicesList?.map((service: any) => (
            <View style={[styles.tableRow, { marginTop: '20px' }]}>
              <Text style={styles.tableCell}>
                {service.serviceAccountingCode}
              </Text>
              <Text style={styles.tableCell}>{service.serviceHours}</Text>
              <Text style={[styles.tableCell, styles.tableCellLast]}>
                {service.serviceAmount}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellLast]}>
                {service.serviceTotalAmount}
              </Text>
            </View>
          ))}
          <View
            style={{ borderTop: '1px solid #000', marginTop: '30px' }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '15px',
          }}
        >
          <View>
            <Text style={styles.tableCell}>Payment Method :</Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                gap: '30px',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={[styles.tableCell, { fontSize: '14px' }]}>
                  Sub Total
                </Text>
              </View>
              <View>
                <Text style={styles.tableCell}>{invoiceData?.subTotal}</Text>
              </View>
            </View>
            {invoiceData?.discountPercentage && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: '30px',
                  justifyContent: 'space-between',
                  marginTop: '30px',
                }}
              >
                <View>
                  <Text style={[styles.tableCell, { fontSize: '14px' }]}>
                    Discount Percentage{' '}
                    {`( ${invoiceData?.discountPercentage} % )`}
                  </Text>
                </View>
                <View>
                  <Text style={styles.tableCell}>
                    {invoiceData?.discountPercentageValue}
                  </Text>
                </View>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                gap: '30px',
                justifyContent: 'space-between',
                marginTop: '30px',
              }}
            >
              <View>
                <Text style={[styles.tableCell, { fontSize: '14px' }]}>
                  Gst Percentage {`( ${invoiceData?.gstPercentage} % )`}
                </Text>
              </View>
              <View>
                <Text style={styles.tableCell}>
                  {invoiceData?.gstPercentageValue}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: '30px',
                justifyContent: 'space-between',
                marginTop: '30px',
              }}
            >
              <View>
                <Text style={[styles.tableCell, { fontSize: '14px' }]}>
                  Tds Tax {`( ${invoiceData?.taxAmount.tds} )`}
                </Text>
              </View>
              <View>
                <Text style={styles.tableCell}>
                  {invoiceData?.tdsAmountValue}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderTop: '1px solid #000',
                flexDirection: 'row',
                gap: '30px',
                justifyContent: 'space-between',
                marginTop: '50px',
              }}
            >
              <View>
                <Text style={[styles.tableCell, { fontSize: '16px' }]}>
                  Total Amount
                </Text>
              </View>
              <View>
                <Text style={styles.tableCell}>{invoiceData?.totalValue}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ borderTop: '1px solid #000', marginTop: '20px' }}></View>
        <View style={[styles.subHeader, { marginTop: '20px' }]}>
          <Text style={styles.text}>Terms & Conditions :</Text>
        </View>
        <View style={{ marginTop: '0px' }}>
          <Text style={styles.text}>Payment is to be made upon receipt.</Text>
        </View>
      </Page>
    </Document>
  );
};
export default InvoiceDocument;
