import { useSelector } from "react-redux";
import GstTypeList from "./GstTypeList";
import GstTypeForm from "./GstTypeCreate";
import { useEffect, useState } from "react";

const GstTypeScreen: React.FC = () => {
    const gstValue = useSelector((state: any) => state.gstTypeState.data);
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        // Whenever gstValue changes, update the key to force re-render
        setKey((prevKey: number) => prevKey + 1);
    }, [gstValue]);

    return (
        <>
            <GstTypeForm key={key} gstTypeValue={gstValue} />
            <GstTypeList />
        </>
    );
};

export default GstTypeScreen;
