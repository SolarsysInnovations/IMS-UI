import { Grid } from "@mui/material";
import { pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import InvoiceLetterUi from "./InvoiceLetterUi";
import InvoiceRoleButtons from "./InvoiceRoleButtons";
import { Dispatch, SetStateAction } from "react";

interface InvoiceUiProps {
  invoiceData?: any;
  subtotal?: number | null;
  discount?: number | null;
  tds?: number | null;
  setIsModalOpen?: Dispatch<SetStateAction<boolean | undefined>>;
  downloadPdf?: boolean;
  preview?: boolean;
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
    <>
      <Grid container>
        <Grid item xs={12}>
          <InvoiceLetterUi setIsModalOpen={setIsModalOpen} />
        </Grid>
      </Grid>
    </>
  );
}

export default InvoiceUi;
