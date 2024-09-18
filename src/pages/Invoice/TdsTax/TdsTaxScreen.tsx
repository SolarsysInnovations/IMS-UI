import { useEffect, useState } from "react";
import TdsTaxCreate from "./TdsTaxCreate";
import TdsTaxList from "./TdsTaxList";
import { useSelector } from "react-redux";

const TdsTaxScreen: React.FC = () => {
    const tdsTaxValue = useSelector((state: any) => state.tdsTaxState.data);
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey((prev) => prev + 1);
    }, [tdsTaxValue]);

    const handleClose = () => {
        // Implement the logic to close the dialog
        console.log("Dialog closed");
    };

    return (
        <>
            <TdsTaxCreate
                key={key}
                tdsTaxValue={tdsTaxValue}
                onClose={handleClose} // Pass the onClose function
            />
            <TdsTaxList />
        </>
    );
};

export default TdsTaxScreen;
