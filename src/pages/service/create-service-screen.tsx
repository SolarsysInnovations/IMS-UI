import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextFieldUi from '../../components/ui/TextField';
import SelectDropdown from '../../components/ui/SelectDropdown';
import { Box, Grid, Stack } from '@mui/material';

interface InputObject {
    id?: number;
    label: string;
    size?: number;
    type?: 'text' | 'number' | 'email' | 'select';
    options?: { value: string; label: string }[];
}

const inputs: InputObject[] = [
    { id: 1, label: 'Name', type: 'text', size: 3 },
    { id: 2, label: 'Age', type: 'number', size: 3 },
    { id: 3, label: 'Email', type: 'email', size: 3 },
    { id: 4, label: 'City', type: 'select', options: [{ value: "arun", label: "arun" }], size: 2 },
];

const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Age: Yup.number().required('Age is required').positive().integer(),
    Email: Yup.string().email('Invalid email').required('Email is required'),
    City: Yup.string().required('City is required'),
});

export const CreateServices: React.FC = () => {
    // ---------- Function to render input components based on type
    const renderInput = (input: InputObject, values: any, touched: any, errors: any, setFieldValue: any) => {
        switch (input.type) {
            case 'text':
            case 'number':
            case 'email':
                return (
                    <Field
                        as={TextFieldUi}
                        key={input.id}
                        fullWidth={false}
                        label={input.label}
                        name={input.label}
                        type={input.type}
                        error={touched[input.label] && Boolean(errors[input.label])}
                        helperText={touched[input.label] && errors[input.label]}
                    />
                );
            case 'select':
                return (
                    <SelectDropdown
                        onChange={(newValue: any) => setFieldValue(input.label, newValue?.value || "")}
                        labelText={input.label}
                        options={input.options || []}
                        value={values[input.label] || ''}
                        error={touched[input.label] && Boolean(errors[input.label])}
                        helperText={touched[input.label] && errors[input.label]}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Input Form</h2>
            <Formik
                initialValues={{
                    Name: '',
                    Age: '',
                    Email: '',
                    City: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, touched, values, errors, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            {inputs.map((input) => (
                                <Grid item xs={input.size} key={input.id}>
                                    {renderInput(input, values, touched, errors, setFieldValue)}
                                </Grid>
                            ))}
                        </Grid>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


export default CreateServices;
