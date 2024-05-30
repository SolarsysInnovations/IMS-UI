import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateCompany from "./Company-create-screen";

const CompanyScreen = () => {
    const companyValue = useSelector((state: any) => state.globalState.data);
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey((prev) => prev + 1)
    }, [companyValue])

    return (
       <>
       <CreateCompany companyValue={companyValue} key={key} />
        </>
    );
};
export default CompanyScreen;
