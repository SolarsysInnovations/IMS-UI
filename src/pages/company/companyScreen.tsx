import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompanyCreate from "./companyCreate";

const CompanyScreen: React.FC = () => {

    const companyValue = useSelector((state: any) => state.globalState.data);

    const [mergedData, setMergedData] = useState<any>({});
    
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        if (companyValue) {
            const mergedObject = {
                ...companyValue.companyDetails,
                ...companyValue.register
            };
            setMergedData(mergedObject);
        }
    }, [companyValue]);

    useEffect(() => {
        setKey(prev => prev + 1);
    }, [companyValue]);

    return (
        <CompanyCreate key={key} companyEditInitialValues={mergedData} />
    );
};

export default CompanyScreen;
