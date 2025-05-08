import React from 'react';
import GridDataUi from '../../../components/GridTable/GridData';
import { tdsTaxColumns } from '../../../constants/grid-table-data/invoice/TdsTax-table-data';
import { useGetTdsTaxListQuery } from '../../../redux-store/api/injectedApis';

const TdsTaxList = () => {
  const { data: getTdsTax } = useGetTdsTaxListQuery();

  return (
    <GridDataUi
      showToolbar={false}
      columns={tdsTaxColumns}
      tableData={getTdsTax || []}
      checkboxSelection={false}
    />
  );
};

export default TdsTaxList;
