import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

interface CompanyDetailsProps {
    details?: any; // Replace 'any' with a more specific type if needed
}

const CompanyDetails: React.FC<CompanyDetailsProps> = () => {
    const companyValue = useSelector((state: any) => state.userState.data); // Replace 'any' with a specific type if possible
    const [mergedData, setMergedData] = useState<{ [key: string]: any }>({});

    console.log("companyValue",companyValue);

    
    useEffect(() => {

        if (companyValue && companyValue.companyDetails && companyValue.userDetails) {
            const mergedObject = {
                ...companyValue.userDetails, // Ensure userDetails are spread first if you want to prioritize those keys
                ...companyValue.companyDetails
            };
            setMergedData(mergedObject);
            console.log("mergedObject",mergedObject);
            
        }

    }, [companyValue]);

    if (!companyValue || !companyValue.companyDetails || !companyValue.userDetails) {
        return null; // Or display a loading indicator or placeholder
    }

    return (
        <Grid container spacing={4}>
              {Object.entries(mergedData).map(([key, value], index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                <strong>{key}:</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                {value as string}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default CompanyDetails;
