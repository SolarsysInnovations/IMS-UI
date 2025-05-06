import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';

interface UserDetailsProps {
  userDetails: {
    userName?: string;
    userEmail?: string;
    userRole?: string;
    userMobile?: number;
    description?: string;
  };
}

const UserDetails = ({ userDetails }: UserDetailsProps) => {
  const values = userDetails;
  const fieldsToShow = [
    { key: 'userName', label: 'User Name' },
    { key: 'userEmail', label: 'User Email' },
    { key: 'userRole', label: 'User Role' },
    { key: 'userMobile', label: 'User Mobile' },
    { key: 'description', label: 'Description' },
  ];

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <div>No details available</div>;
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        {fieldsToShow.map(({ key, label }) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
              {userDetails[key as keyof typeof userDetails] || 'N/A'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserDetails;
