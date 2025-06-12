import { Grid } from '@mui/material';
import { pdfjs } from 'react-pdf';
import InvoiceLetterUi from './InvoiceLetterUi';
import { Dispatch, SetStateAction } from 'react';

interface InvoiceUiProps {
  readonly invoiceData?: any;
  readonly setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function InvoiceUi({ invoiceData, setIsModalOpen }: InvoiceUiProps) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoiceLetterUi
          setIsModalOpen={setIsModalOpen}
          inVoiceValue={invoiceData}
        />
      </Grid>
    </Grid>
  );
}

export default InvoiceUi;
