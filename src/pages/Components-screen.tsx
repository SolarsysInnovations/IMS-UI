import React from 'react'
import ButtonUi from '../components/ui/Button';
import TextFieldLarge from '../components/ui/TextFieldLarge';
import { Stack } from '@mui/material';
import TextFieldUi from '../components/ui/TextField';
import AutoCompleteSelectUi from '../components/ui/AutoCompleteSelectUi';

const ComponentsScreen = () => {
    return (
        <Stack spacing={3}>
            <ButtonUi variant='contained' />
            <TextFieldLarge label='Text Field' />
            <TextFieldUi label='small text field' />
            <AutoCompleteSelectUi />
        </Stack>
    )
}

export default ComponentsScreen;