import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const AlertUi = ({ message }: any) => {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      {message}
    </Alert>
  );
};

export default AlertUi;
