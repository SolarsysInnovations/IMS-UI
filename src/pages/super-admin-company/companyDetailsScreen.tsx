import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

interface CompanyDetailsProps {
    details?: any; // You can replace 'any' with a more specific type if needed
}

const CompanyDetails: React.FC<CompanyDetailsProps> = () => {
    const companyValue = useSelector((state: any) => state.userState.data); // Replace 'any' with specific type if possible
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
            <Grid item md={6} key={key}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="initial">
                            <strong>{key}:</strong>
                            {Array.isArray(value) ? (
                                <>
                                    {value.map((item: any, index: number) => (
                                        <Box key={index} mb={2}>
                                            {Object.entries(item).map(([subKey, subValue]) => (
                                                <Grid container spacing={2} key={subKey}>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <strong>{subKey}:</strong>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant="body2">
                                                            {subValue as string}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Box>
                                    ))}
                                </>
                            ) : (
                                <Typography variant="body2">
                                    {value as string}
                                </Typography>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        ))}
    </Grid>
    );
};

export default CompanyDetails;
