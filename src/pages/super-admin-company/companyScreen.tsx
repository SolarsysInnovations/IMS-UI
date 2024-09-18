import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompanyCreate from "./companyCreate";

const CompanyScreen: React.FC = () => {

    const companyValue = useSelector((state: any) => state.userState.data);

    const [mergedData, setMergedData] = useState<any>({});

    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        if (companyValue) {
            const mergedObject = {
                ...companyValue.companyDetails,
                ...companyValue.userDetails
            };
            setMergedData(mergedObject);
        }
    }, [companyValue]);


    const mode = companyValue ? 'edit' : 'create';
    useEffect(() => {
        setKey(prev => prev + 1);
    }, [companyValue]);


    return (
        <>
            {mergedData && (
                <CompanyCreate key={key} companyEditInitialValues={mergedData} mode={mode} />
            )}
        </>
    );
};

export default CompanyScreen;
