import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompanyCreate from "./companyCreate";
import { CompanyData } from "./companyListScreen";

const CompanyScreen: React.FC = () => {
    
    const companyValue = useSelector((state: any) => state.globalState.data);
    const [mergedData, setMergedData] = useState<CompanyData[]>([]);

    useEffect(() => {
        if (companyValue) {
            const mergedObject = {
                ...companyValue.companyDetails,
                ...companyValue.register
            };
            console.log("mergedObject new", mergedObject);
            setMergedData(mergedObject);
            console.log('companyValue data', companyValue);
            console.log("merged data", mergedData);
        }
    }, [companyValue]);
    
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey((prev) => prev + 1)
    }, [companyValue])

    return (
        <>
            <CompanyCreate key={key} companyEditInitialValues={mergedData} />
        </>
    );
};

export default CompanyScreen;
