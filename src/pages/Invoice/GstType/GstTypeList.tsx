import { useQueryClient } from '@tanstack/react-query';
import GridDataUi from '../../../components/GridTable/GridData';
import { gstTypeColumns } from '../../../constants/grid-table-data/invoice/GstType-table-data';

const GstTypeList = () => {
  const queryclient = useQueryClient();
  const gstTypeList = queryclient.getQueryData(['getGstTypeList']);

  return (
    <GridDataUi
      showToolbar={false}
      columns={gstTypeColumns}
      tableData={gstTypeList ?? []}
      checkboxSelection={false}
    />
  );
};

export default GstTypeList;
