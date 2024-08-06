import React, { useState } from 'react'
import ServiceCreate from '../../service/ServiceCreate';
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
            <ServiceCreate serviceValue={} />
            {/* <ServicesList /> */}
        </>
    )
}

export default ServiceScreen