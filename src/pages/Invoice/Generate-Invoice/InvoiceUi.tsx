import { Grid, } from "@mui/material";
import { pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import InvoiceLetterUi from "./InvoiceLetterUi";
import InvoiceRoleButtons from "./InvoiceRoleButtons";

interface InvoiceUiProps {
  invoiceData?: any;
  subtotal?: number | null;
  discount?: number | null;
  tds?: number | null;
  isModalOpen?: any;
  downloadPdf?: boolean;
  preview?: boolean;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function InvoiceUi({ preview, downloadPdf, subtotal, discount, tds, isModalOpen }: InvoiceUiProps) {
  const invoiceData = useSelector((state: any) => state.invoiceState.data);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <InvoiceLetterUi invoiceData={invoiceData} />
        </Grid>

      </Grid>
    </>
  );
}

export default InvoiceUi;
