import React from 'react';
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

interface SubField {
    name: string;
    label: string;
    type: string;
    gridSize?: number;
    validation?: Yup.StringSchema<string>;
    options?: { value: string; label: string }[];
}

interface Field {
    name: string;
    label?: string;
    type: string;
    titleGridSize?: number;
    subFields?: SubField[];
}

interface FormProps {
    fields: Field[];
    initialValues: any;
    validationSchema: any;
    onSubmit: (values: any, actions: any) => void;
}

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


const FieldRenderer: React.FC<{ field: Field; setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void }> = ({ field, setFieldValue }) => {
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
                            {fields?.map((field: Field) => (
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

// Define your form fields
const fields: Field[] = [
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        subFields: [
            {
                name: 'customerType', label: 'customerType', type: 'radio', gridSize: 3, options: [{ value: "Business", label: "Business" },
                { value: "Individual", label: "Individual" }], validation: Yup.string().required('customerName is required',)
            },
        ]
    },
    {
        type: 'section',
        titleGridSize: 12,
        name: "info",
        label: 'Address Information',
        subFields: [
            { name: 'customerName', label: 'customerName', type: 'text', gridSize: 3, validation: Yup.string().required('customerName is required',) },
            { name: 'companyName', label: 'companyName', type: 'text', gridSize: 3, validation: Yup.string().required('companyName is required') },
            { name: 'customerEmail', label: 'customerEmail', type: 'email', gridSize: 3, validation: Yup.string().required('customerEmail is required') },
            { name: 'customerPhone', label: 'customerPhone', type: 'number', gridSize: 3, validation: Yup.string().required('customerPhone is required') },
        ]
    },
    {
        name: 'otherDetails',
        label: 'Other Details',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'paymentTerms', label: 'paymentTerms', type: 'select', gridSize: 3, options: [{ value: "Monthly", label: "Monthly" },
                { value: "Annual", label: "Annual" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Due on receipt", label: "Due on receipt" },
                { value: "Net 30", label: "Net 30" },
                { value: "Net 45", label: "Net 45" },
                ], validation: Yup.string().required('paymentTerms is required')
            },

        ]
    },
    {
        name: 'country',
        label: 'Country / region',
        type: 'section',
        titleGridSize: 12,
        subFields: [
            {
                name: 'country', label: 'country/region', type: 'select', gridSize: 3, options: [{ value: "uk", label: "uk" },
                { value: "australia", label: "australia" }], validation: Yup.string().required('paymentTerms is required')
            },
            { name: 'address', label: 'Address', type: 'text', gridSize: 3, validation: Yup.string().required('address is required') },
            {
                name: 'city', label: 'City', type: 'select', gridSize: 3, options: [
                    { value: "India", label: "India" },
                    { value: "India", label: "India" }
                ], validation: Yup.string().required('companyName is required')
            },
            {
                name: 'state', label: 'State', type: 'select', gridSize: 3, options: [
                    { value: "Chennai", label: "Chennai" },
                    { value: "Trichy", label: "Trichy" }
                ], validation: Yup.string().required('companyName is required')
            },
            { name: 'pinCode', label: 'PinCode', type: 'number', gridSize: 3, validation: Yup.string().required('pinCode is required') },

        ]
    },
    {
        name: 'contactPersons',
        label: 'Contact Persons',
        type: 'array',
        titleGridSize: 12,
        subFields: [
            { name: 'contactName', label: 'contactName', type: 'text', gridSize: 3, validation: Yup.string().required('contactName is required') },
            { name: 'contactEmail', label: 'contactEmail', type: 'email', gridSize: 3, validation: Yup.string().required('contactEmail is required') },
            { name: 'contactPhone', label: 'contactPhone', type: 'number', gridSize: 3, validation: Yup.string().required('contactPhone is required') },
        ]
    },
];

// Define initial values for your form
const initialValues = {
    customerType: "",
    customerName: "",
    companyName: "",
    customerEmail: "",
    customerPhone: "",
    paymentTerms: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    contactPersons: [{
        contactName: '',
        contactEmail: '',
        contactPhone: '',
    }],
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
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            <DynamicCustomerCreate
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default MyComponent;
