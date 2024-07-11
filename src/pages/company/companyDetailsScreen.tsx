import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

interface CompanyDetailsProps {
    details?: any;
}

const CompanyDetails = () => {
    const companyValue = useSelector((state: any) => state.globalState.data);
    const [mergedData, setMergedData] = useState<any>({});
    console.log("companyValue", companyValue);

    console.log("mergedData", mergedData);

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

    return (
        <Grid container spacing={2}>
            {Object.entries(mergedData).map(([key, value]) => (
                <Grid item sm={6} key={key}>
                    <Typography variant="body2" color="initial">
                        <strong>{key}:</strong>
                        {Array.isArray(value) ? (
                            <>
                                {value?.map((item, index) => (
                                    <div key={index}>
                                        {Object.entries(item).map(([subKey, subValue]) => (
                                            <div key={subKey}>
                                                <strong>{subKey}:</strong> {subValue as string}{' '}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <span> {value as string}</span>
                        )}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default CompanyDetails;
