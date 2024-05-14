import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import TableHeader from '../../../components/layouts/TableHeader'
import usePathname from '../../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux-store/store'
import ToastUi from '../../../components/ui/ToastifyUi'
import { useGetServiceQuery } from '../../../redux-store/service/serviceApi'
import { useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi'
import { tdsTaxColumns } from '../../../constants/grid-table-data/invoice/TdsTax-table-data'
import { useGetTdsTaxQuery } from '../../../redux-store/invoice/tdsTaxApi'

const TdsTaxList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: getTdsTax, error, isLoading } = useGetTdsTaxQuery();


    return (
        <>
            <ToastUi autoClose={1000} />
            <GridDataUi showToolbar={false} columns={tdsTaxColumns} tableData={getTdsTax || []} checkboxSelection={false} />
        </>
    )
}

export default TdsTaxList