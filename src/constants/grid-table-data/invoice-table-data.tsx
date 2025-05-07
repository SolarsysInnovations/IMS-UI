import { Box, Stack } from '@mui/material';
import {
  GridColDef,
} from '@mui/x-data-grid';
import ServiceDetails from '../../pages/service/serviceDetails';

const id = 1;

const MyCellRenderer = ({ id }: any) => {
  return (
    <Stack direction="row" spacing={1}>
      <Box sx={{ marginTop: '15px' }}>
        <ServiceDetails details={id} />
      </Box>
    </Stack>
  );
};

export const columns: GridColDef[] = [
  {
    field: 'invoiceType',
    headerName: 'Invoice Type',
    width: 150,
    editable: true,
  },
  {
    field: 'invoiceNumber',
    headerName: 'Invoice Number',
    width: 150,
    editable: true,
  },
  {
    field: 'customerName',
    headerName: 'Customer Name',
    width: 150,
    editable: false,
  },
  {
    field: 'invoiceDate',
    headerName: 'Invoice Date',
    width: 150,
    editable: false,
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 150,
    editable: false,
  },
  {
    field: 'invoiceStatus',
    headerName: 'Invoice Status',
    width: 150,
    editable: false,
  },
  {
    field: 'totalAmount',
    headerName: 'Total',
    width: 150,
    editable: false,
  },
];
