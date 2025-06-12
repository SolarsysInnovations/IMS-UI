import React from 'react';
import GridDataUi from '../../../components/GridTable/GridData';
import { tdsTaxColumns } from '../../../constants/grid-table-data/invoice/TdsTax-table-data';
import { useQueryClient } from '@tanstack/react-query';

const TdsTaxList = () => {
  const queryclient = useQueryClient();
  const getTdsTax = queryclient.getQueryData(['getTdsTaxList']);

  return (
    <GridDataUi
      showToolbar={false}
      columns={tdsTaxColumns}
      tableData={getTdsTax ?? []}
      checkboxSelection={false}
    />
  );
};

export default TdsTaxList;
