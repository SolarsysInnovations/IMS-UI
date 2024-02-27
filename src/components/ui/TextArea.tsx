import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextAreaUi() {
  return (
    <Box
      component="form"
      sx={{
        borderRadius: "8px !important",
        '& .MuiOutlinedInput-root': {
          borderRadius: "8px !important",
          overflow: "hidden",
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
          '&:hover': {
            backgroundColor: `action.hover`,
          },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="outlined-basic" label="Outlined" variant="outlined"
        multiline
        rows={4}
        defaultValue="Default Value"
      />
    </Box>
  );
}