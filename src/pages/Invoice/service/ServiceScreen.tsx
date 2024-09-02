import React, { useState } from 'react'
import ServiceCreate from '../../service/service-create-screen'
import { useGetServiceListQuery } from '../../../redux-store/api/injectedApis';

const ServiceScreen = ({ setIsOpenDialogBox }: any) => {
    const [openModal, setOpenModal] = useState(false);
    const { data: serviceList, error, isLoading, refetch } = useGetServiceListQuery();


    const handleModalClose = () => {
        refetch();
        setOpenModal(false);
    };

    return (
        <>
            <ServiceCreate setIsOpenDialogBox={setIsOpenDialogBox} />
            {/* <ServicesList /> */}
        </>
    )
}

export default ServiceScreen