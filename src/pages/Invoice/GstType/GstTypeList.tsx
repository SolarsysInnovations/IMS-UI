import GridDataUi from '../../../components/GridTable/GridData'
import { useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi'
import { gstTypeColumns } from '../../../constants/grid-table-data/invoice/GstType-table-data'

const GstTypeList = () => {
    const { data: gstTypeList, error, isLoading, refetch } = useGetGstTypeQuery();

    return (
        <>
            <GridDataUi showToolbar={false} columns={gstTypeColumns} tableData={gstTypeList || []} checkboxSelection={false} />
        </>
    )
}

export default GstTypeList;