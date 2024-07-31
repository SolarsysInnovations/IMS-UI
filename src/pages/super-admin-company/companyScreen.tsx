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
                ...companyValue.company,
                ...companyValue.admin
            };
            setMergedData(mergedObject);
        }
    }, [companyValue]);

    const mode = companyValue ? 'edit' : 'create';
    useEffect(() => {
        setKey(prev => prev + 1);
    }, [companyValue]);

    console.log("mergedData", mergedData);

    return (
        <>
            {mergedData && (
                <CompanyCreate key={key} companyEditInitialValues={mergedData} mode={mode} />
            )}
        </>
    );
};

export default CompanyScreen;
