import React, { useEffect } from 'react';
import { Form, Field, ErrorMessage, FieldArray, Formik } from 'formik';
import { TextField, Button, Typography, Grid, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import TextFieldUi from '../../components/ui/TextField';
import SelectDropdown from '../../components/ui/SelectDropdown';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import RadioUi from '../../components/ui/RadioGroup';
import { useAddCustomerMutation } from '../../redux-store/customer/customerApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { fields } from '../../constants/form-data/form-data-json';
import { FieldProps, FormProps, SubField } from '../../types/types';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';



const renderSelectField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    const options: any = subField.options?.map(option => ({
        value: option.value,
        label: option.label
    })) || [];
    return (
        <Field name={subField.name}>
            {({ field: { value, onChange } }: any) => (
                <SelectDropdown

                    labelText={subField.label}
                    value={options.find((opt: any) => opt.value === value)}
                    onChange={(newValue: any) => {
                        console.log(newValue);
                        if (newValue) {
                            onChange(newValue.value);
                            setFieldValue(subField.name, newValue.value);
                        } else {
                            setFieldValue(subField.name, '');
                            console.log("clearing value");
                            onChange("");
                        }

                    }}
                    options={options}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                />
            )}
        </Field>

    );
};

const renderTextField = (field: any, meta: any, subField: SubField) => (
    <TextFieldUi
        {...field}
        // variant="outlined"
        // margin="normal"
        type={subField.type}
        fullWidth
        id={subField.name}
        label={subField.label}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
    />
);

const renderRadioField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    const options: any = subField.options?.map(option => ({
        value: option.value,
        label: option.label
    })) || [];

    return (
        <RadioUi options={options} value={field.value} onChange={(newValue: any) => {
            console.log(newValue);
            if (newValue) {
                setFieldValue(subField.name, newValue.target.value);
            } else {
                setFieldValue(subField.name, '');
                console.log("clearing value");
            }
        }}
        />
    );
};


const FieldRenderer: React.FC<{ field: FieldProps; setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void }> = ({ field, setFieldValue }) => {
    switch (field.type) {
        case 'section':
            return (
                <>
                    <Grid item xs={field?.titleGridSize}>
                        <Typography variant="body2" gutterBottom>{field?.label}</Typography>
                    </Grid>
                    {field.subFields?.map((subField: SubField) => (
                        <Grid pb={2} pl={2} xs={subField.gridSize} key={subField.name}>
                            <Field name={subField.name}>
                                {({ field, meta }: any) => (
                                    subField.type === "select"
                                        ? renderSelectField(field, meta, subField, setFieldValue)
                                        : subField.type === "radio"
                                            ? renderRadioField(field, meta, subField, setFieldValue)
                                            : renderTextField(field, meta, subField)
                                )}
                            </Field>
                        </Grid>
                    ))}
                </>
            );
        case 'array':
            return (
                <>
                    <Grid item xs={field?.titleGridSize}>
                        <Typography variant="body2" gutterBottom>{field?.label}</Typography>
                    </Grid>
                    <FieldArray name={field.name}>
                        {({ push, remove, form }: any) => (
                            <>
                                {form.values[field.name]?.map((item: any, index: number) => (
                                    <React.Fragment key={index}>
                                        {field.subFields?.map((subField: SubField) => (
                                            <Grid pb={2} pl={2} xs={subField.gridSize} key={subField.name}>
                                                <Field name={`${field.name}.${index}.${subField.name}`}>
                                                    {({ field, meta }: any) => (
                                                        renderTextField(field, meta, subField)
                                                    )}
                                                </Field>
                                            </Grid>
                                        ))}
                                        <ButtonSmallUi type="button" variant='contained' onClick={() => remove(index)} label="Delete" />
                                        {/* <IconButton size='small' onClick={() => remove(index)}>
                                            <DeleteIcon />
                                        </IconButton> */}
                                    </React.Fragment>
                                ))}
                                <ButtonSmallUi type="button" variant='contained' onClick={() => push({})} label={`Add `} />
                                {/* ${field.label.slice(0, -1)} to add label */}
                            </>
                        )}
                    </FieldArray>
                </>
            );
        case 'object':
            return (
                <div>
                    <Typography variant="body2" gutterBottom>{field?.label}</Typography>
                    {field.subFields?.map((subField: SubField) => (
                        <div key={subField.name}>
                            <Field name={`${field.name}.${subField.name}`}>
                                {({ field, meta }: any) => (
                                    renderTextField(field, meta, subField)
                                )}
                            </Field>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
};

const DynamicCustomerCreate: React.FC<FormProps> = ({ fields, initialValues, validationSchema, onSubmit }) => {
    const pathname = usePathname();
    const navigate = useNavigate();
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                // validate={() => ({})}
                onSubmit={onSubmit}
            >
                {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => (
                    <>
                        <TableHeader headerName={pathname} buttons={[
                            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                            { label: 'Save', icon: Add, onClick: handleSubmit },
                        ]} />
                        <Form>
                            {fields?.map((field: FieldProps) => (
                                <Grid key={field.name} container spacing={2}>
                                    <FieldRenderer field={field} setFieldValue={setFieldValue} />
                                </Grid>
                            ))}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
};

const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    customerEmail: Yup.string().email('Invalid email').required('Customer Email is required'),
    customerPhone: Yup.string().required('Customer Number is required'),
    paymentTerms: Yup.string().required('Payment Terms is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pinCode: Yup.string().required('Pin Code is required'),
    contactPersons: Yup.array().of(
        Yup.object().shape({
            contactName: Yup.string().required('Contact Person Name is required'),
            contactEmail: Yup.string().email('Invalid email').required('Contact Person Email is required'),
            contactPhone: Yup.string().required('Contact Person Phone is required'),
        })
    ).min(1, 'At least one contact person is required'),
});

const MyComponent: React.FC = () => {
    const [addCustomer, { isLoading, isSuccess, isError, error }] = useAddCustomerMutation();

    const onSubmit = async (values: any, actions: any) => {
        try {
            console.log(values);
            actions.resetForm();
            await addCustomer(values);
            toast.success("successfully created the new customer", toastConfig)
            alert("created the new customer")
        } catch (error) {
            console.log(error);
        }

    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new customer", toastConfig)
        }
    }, [isSuccess])
    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            <DynamicCustomerCreate
                fields={fields}
                initialValues={customerInitialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default MyComponent;
