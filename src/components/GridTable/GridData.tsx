import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

interface GridDataProps {
  readonly columns: GridColDef[];
  readonly tableData?: any;
  readonly checkboxSelection?: any;
  readonly showToolbar?: boolean;
  readonly pagination?: boolean;
  readonly hideFooter?: boolean;
  readonly onCellEditor?: any;
  readonly onCellEditStop?: any;
  readonly onEditStart?: any;
  readonly onEditClick?: any;
}
export default function GridDataUi({
  onEditStart,
  onCellEditStop,
  onCellEditor,
  hideFooter,
  pagination,
  showToolbar,
  checkboxSelection,
  columns,
  tableData,
}: GridDataProps) {
  return (
    <Box sx={{ height: 'fit-content', width: '100%' }}>
      <DataGrid
        onCellEditStart={onCellEditor}
        onRowEditStart={onEditStart}
        onCellEditStop={onCellEditStop}
        sx={{
          overflow: 'hidden',
          borderRadius: '10px',
          '& .MuiDataGrid-root': {
            color: `#fff`,
          },
          '& .MuiIconButton-label': {
            color: `#fff`,
          },
          '& .MuiDataGrid-toolbarContainer': {
            padding: ' 2px 4px 0px 0px',
            backgroundColor: '#fafaff',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          },
          '& .MuiButton-root': {
            color: 'grey.600',
            backgroundColor: 'transparent',
          },
          '& ::-webkit-scrollbar': {
            height: '8px!important',
            width: '80px!important',
          },
          '& ::-webkit-scrollbar-track': {
            backgroundColor: '#f5f5f5',
          },
          '& ::-webkit-scrollbar-thumb': {
            width: '80px!important',
            borderRadius: '10px',
            backgroundColor: 'grey.200',
          },
          '& .css-ha70k2-MuiInputBase-root-MuiInput-root': {
            fontSize: '12px',
          },
          '.css-1qgbav7-MuiButtonBase-root-MuiButton-root': {
            fontSize: '12px',
          },
        }}
        rows={tableData ?? []}
        columns={columns || []}
        initialState={{
          // * below pagination for grid table
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        localeText={{
          toolbarDensity: 'Size',
          toolbarDensityLabel: 'Size',
          toolbarDensityCompact: 'Small',
          toolbarDensityStandard: 'Medium',
          toolbarDensityComfortable: 'Large',
        }}
        slots={{
          toolbar: showToolbar ? GridToolbar : undefined,
        }}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: false },
            showQuickFilter: true,
          },
        }}
        rowHeight={40}
        columnBuffer={2}
        columnThreshold={2}
        pageSizeOptions={[8, 15]}
        // * below checkbox selection multi and single
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        hideFooterPagination={pagination}
        hideFooter={hideFooter}
      />
    </Box>
  );
}
