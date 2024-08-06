import { useEffect, useState } from "react";
import ServiceCreate from "./ServiceCreate";
import ServicesList from "./ServiceList";
import { useSelector } from "react-redux";

const TdsTaxScreen: React.FC = () => {
    const serviceValue = useSelector((state: any) => state.globalState.data);
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey((prev) => prev + 1)
    }, [serviceValue])

    return (
        <>
            <ServiceCreate key={key} serviceValue={serviceValue} />
            <ServicesList />
        </>
    );
};

export default TdsTaxScreen;
