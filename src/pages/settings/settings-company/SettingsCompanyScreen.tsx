import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SettingsCompanyForm from "./SettingsCompanyForm";

const SettingsCompanyScreen = () => {
    const companyValue = useSelector((state: any) => state.globalState.data);
    console.log("company value", companyValue);

    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey((prev) => prev + 1);
    }, [companyValue]);

    const handleCloseDialog = () => {
      
    };

    const mode = companyValue ? 'edit' : 'create';

    return (
        <>
            <SettingsCompanyForm
                companyValue={companyValue}
                key={key}
                mode={mode}
                handleCloseDialog={handleCloseDialog} // Pass the handleCloseDialog function
            />
        </>
    );
};

export default SettingsCompanyScreen;
