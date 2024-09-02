import React from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { useDispatch, } from 'react-redux'
import { AppDispatch, } from '../../../redux-store/store'
import { tdsTaxColumns } from '../../../constants/grid-table-data/invoice/TdsTax-table-data'
import { useGetTdsTaxListQuery } from '../../../redux-store/api/injectedApis'

const TdsTaxList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: getTdsTax, error, isLoading, refetch } = useGetTdsTaxListQuery();

    return (
        <>
            <GridDataUi showToolbar={false} columns={tdsTaxColumns} tableData={getTdsTax || []} checkboxSelection={false} />
        </>
    );
}

export default TdsTaxList