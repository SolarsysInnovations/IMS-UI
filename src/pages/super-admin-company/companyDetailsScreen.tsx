import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

interface CompanyDetailsProps {
    details?: any; // You can replace 'any' with a more specific type if needed
}

const CompanyDetails: React.FC<CompanyDetailsProps> = () => {
    const companyValue = useSelector((state: any) => state.globalState.data); // Replace 'any' with specific type if possible
    const [mergedData, setMergedData] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        if (companyValue && companyValue.companyDetails && companyValue.userDetails) {
            const mergedObject = {
                ...companyValue.companyDetails,
                ...companyValue.userDetails
            };
            setMergedData(mergedObject);
        }
    }, [companyValue]);

    if (!companyValue || !companyValue.companyDetails || !companyValue.userDetails) {
        return null; // Or display a loading indicator or placeholder
    }

    return (
        <Grid container spacing={2}>
            {Object.entries(mergedData).map(([key, value]) => (
                <Grid item sm={6} key={key}>
                    <Typography variant="body2" color="initial">
                        <strong>{key}:</strong>
                        {Array.isArray(value) ? (
                            <>
                                {value.map((item: any, index: number) => (
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
