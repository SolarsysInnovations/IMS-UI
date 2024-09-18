import GridDataUi from '../../../components/GridTable/GridData'
import { gstTypeColumns } from '../../../constants/grid-table-data/invoice/GstType-table-data'
import { useGetGstTypeListQuery } from '../../../redux-store/api/injectedApis';

const GstTypeList = () => {
    const { data: gstTypeList, error, isLoading, refetch } = useGetGstTypeListQuery();

    return (
        <>
            <GridDataUi showToolbar={false} columns={gstTypeColumns} tableData={gstTypeList || []} checkboxSelection={false} />
        </>
    )
}

export default GstTypeList;