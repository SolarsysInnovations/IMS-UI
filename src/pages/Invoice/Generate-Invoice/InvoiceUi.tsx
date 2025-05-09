import { Grid } from '@mui/material';
import { pdfjs } from 'react-pdf';
import InvoiceLetterUi from './InvoiceLetterUi';
import { Dispatch, SetStateAction } from 'react';

interface InvoiceUiProps {
  readonly invoiceData?: any;
  readonly subtotal?: number | null;
  readonly discount?: number | null;
  readonly tds?: number | null;
  readonly setIsModalOpen?: Dispatch<SetStateAction<boolean | undefined>>;
  readonly downloadPdf?: boolean;
  readonly preview?: boolean;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function InvoiceUi({
  preview,
  downloadPdf,
  subtotal,
  discount,
  tds,
  invoiceData,
  setIsModalOpen,
}: InvoiceUiProps) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoiceLetterUi setIsModalOpen={setIsModalOpen} />
      </Grid>
    </Grid>
  );
}

export default InvoiceUi;
