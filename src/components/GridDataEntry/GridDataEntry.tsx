import { Box, Grid, Button } from '@mui/material'
import React, { useState } from 'react'
import TextFieldUi from '../ui/TextField'
import { useDispatch } from 'react-redux';
import { updateEmail, updateName } from '../../redux-store/customer/customerSlice';


const GridDataEntry = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handleSubmit = () => {
        console.log(email);
        console.log(name);
        dispatch(updateEmail(email));
        dispatch(updateName(name));
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box>
                        <TextFieldUi fullWidth label='Name' value={name} onChange={handleNameChange} />
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box>
                        <TextFieldUi fullWidth label='Email' value={email} onChange={handleEmailChange} />
                    </Box>
                </Grid>
            </Grid>
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default GridDataEntry;
