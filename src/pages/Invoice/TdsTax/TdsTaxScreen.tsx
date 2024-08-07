import { useEffect, useState } from "react";
import TdsTaxCreate from "./TdsTaxCreate";
import TdsTaxList from "./TdsTaxList";
import { useSelector } from "react-redux";

const TdsTaxScreen: React.FC = () => {
    const tdsTaxValue = useSelector((state: any) => state.tdsTaxState.data);
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey((prev) => prev + 1)
    }, [tdsTaxValue])

    return (
        <>
            <TdsTaxCreate key={key} tdsTaxValue={tdsTaxValue} />
            <TdsTaxList />
        </>
    );
};

export default TdsTaxScreen;
