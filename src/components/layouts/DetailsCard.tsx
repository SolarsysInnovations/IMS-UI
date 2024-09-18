import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

// Example data that could be dynamically provided
const customerDetailsArray = [
    {
        firstName: "arun",
        lastName: "sachin",
        age: 26,
        sex: "male",
        contactPersons: [
            {
                name: "john",
                contactNumber: "9876543210"
            },
            {
                name: "jane",
                contactNumber: "1234567890"
            }
        ]
    },
    // Add more objects if needed
];

const flattenCustomerDetails = (detailsArray: typeof customerDetailsArray) => {
    return detailsArray.flatMap((details, idx) => {
        const { contactPersons, ...userDetails } = details;

        // Flatten userDetails into an array of [key, value] pairs
        const flattenedUserDetails = Object.entries(userDetails).map(([key, value]) => [
            key.replace(/([A-Z])/g, ' $1').toUpperCase(), // Convert camelCase to readable format
            value
        ]);

        // Flatten contactPersons into an array of [key, value] pairs
        const flattenedContactPersons = contactPersons.flatMap((person, index) => [
            [`Contact Person`, person.name],
            [`Contact Number`, person.contactNumber]
        ]);

        return [
            { title: `User Details `, data: flattenedUserDetails },
            { title: `Contact Persons `, data: flattenedContactPersons }
        ];
    });
};

const flattenedDetails = flattenCustomerDetails(customerDetailsArray);

const DetailsCard = () => {
    return (
        <Grid container spacing={4}>
            {flattenedDetails.map((section, sectionIndex) => (
                <Grid item xs={8} key={sectionIndex}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        {/* <Typography variant="h6" gutterBottom>{section.title}</Typography> */}
                        <Grid container spacing={1}>
                            {section.data.map(([key, value], index) => (
                                <Grid key={index} mt={0.5} item xs={6}>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>{key}:</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">{value}</Typography>
                                </Grid>

                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default DetailsCard;
