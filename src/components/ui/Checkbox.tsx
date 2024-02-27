import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';


interface CheckboxesProps {
    label?: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

export default function CheckboxesUi({ label, disabled, checked, onChange }: CheckboxesProps) {
    return (
        <div>
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox
                        size='small'
                        disabled={disabled}
                        checked={checked}
                        onChange={onChange}
                        defaultChecked />} label={label} />
            </FormGroup>

        </div>
    );
}