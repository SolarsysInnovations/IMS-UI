import { Box, Stack } from '@mui/material';
import {
  GridColDef,
} from '@mui/x-data-grid';
import ServiceDetails from '../../pages/service/serviceDetails';

const id = 1;

const MyCellRenderer = ({ id, contactPersons }: any) => {

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
    field: 'customerName',
    headerName: 'Customer Name',
    width: 180,
    editable: false,
  },
  {
    field: 'days0to30',
    headerName: '0-30 Days',
    width: 180,
    editable: true,
  },
  {
    field: 'days30to45',
    headerName: '30-45 Days',
    width: 240,
    editable: false,
  },
  {
    field: 'above45',
    headerName: 'Above 45 Days',
    width: 180,
    editable: false,
  },
  {
    field: 'total',
    headerName: 'Total Amount',
    width: 150,
    editable: false,
    valueGetter: (params: any) => params.value ?? 0,
  },
];
