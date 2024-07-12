import React, { useState } from 'react'
import ServiceCreate from '../../service/service-create-screen'
import ServicesList from '../../service/service-list-screen'
import { useGetServiceQuery } from '../../../redux-store/service/serviceApi';

const ServiceScreen = () => {
    const [openModal, setOpenModal] = useState(false);
    const { data: serviceList, error, isLoading, refetch } = useGetServiceQuery();


    const handleModalClose = () => {
        refetch();
        setOpenModal(false);
    };

    return (
        <>
                    <ServiceCreate onSuccess={handleModalClose} />
                    {/* <ServicesList /> */}
        </>
    )
}

export default ServiceScreen