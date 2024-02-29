import React, { useState } from 'react'
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';
import usePathname from '../../hooks/usePathname';
import { useNavigate } from 'react-router-dom';
import GridDataEntry from '../../components/GridDataEntry/GridDataEntry';
import { useDispatch } from 'react-redux';
import { fetchClientList } from '../../redux-store/client/fetchClientList';
import { Box, Button, Grid } from '@mui/material';
import TextFieldUi from '../../components/ui/TextField';
import { updateEmail, updateName } from '../../redux-store/client/clientSlice';
import { AppDispatch } from '../../redux-store/store';

const CreateClient = () => {
    const dispatch = useDispatch<AppDispatch>();
    // dispatch(fetchClientList());
    const buttons = [
        { label: 'Back', icon: Add, onClick: () => navigate(-1) },
        { label: 'Save', icon: Add, onClick: () => navigate("/client/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
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
            <TableHeader headerName={pathname} buttons={buttons} />
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

export default CreateClient