// dynamic-form.tsx
import React from 'react';
import TextFieldUi from '../ui/TextField';
import RadioUi from '../ui/RadioGroup';
import SelectDropdown from '../ui/SelectDropdown';
import TableHeader from '../layouts/TableHeader';
import TextFieldLarge from '../ui/TextFieldLarge';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { VisibilityOff, VisibilityOutlined } from '@mui/icons-material';
import DatePickerUi from '../ui/DatePicker';
import MultiSelectUi from '../ui/MultiSelect';
import { FieldType } from '../../constants/Enums';
import usePathname from '../../hooks/usePathname';

interface FormFieldRendererProps {
    field: any;
    formData: any;
    setFormData?: (fieldName: string, value: any) => void; // Update setFormData prop type
    onChange?: any;
    handleBack?: any;
    handleSave?: any;
    handleAdd?: any;
    handlePreviewInvoice?: any;
    touched: any;
    errors: any;
}

const FormFieldRenderer = ({ handleAdd, touched, errors, onChange, field, formData, setFormData, handleBack, handleSave, handlePreviewInvoice }: FormFieldRendererProps) => {
    console.log(formData);



    const pathName = usePathname();
    const handleButtonClick = (onClick: any, preventDefault: boolean = false) => {
        const handleClick = () => {
            switch (onClick) {
                case 'handleAdd':
                    handleAdd();
                    break;
                case 'handleBack':
                    handleBack();
                    break;
                case 'handleSave':
                    handleSave();
                    break;
                case 'handlePreviewInvoice':
                    handlePreviewInvoice();
                    break;
                default:
                    break;
            }
        };

        return preventDefault
            ? (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                handleClick();
            }
            : handleClick;
    };

    const [passwordVisible, setPasswordVisible] = React.useState(false);

    switch (field.type) {
        case FieldType.TableHeader:
            return (
                <Grid item xs={field.gridSize}>
                    <TableHeader
                        headerName={field.headerName || pathName}
                        buttons={field.buttons.map((button: any) => ({
                            ...button,
                            onClick: handleButtonClick(button.onClick, true)
                        }))}
                    />

                </Grid>
            );
        case FieldType.Heading:
            return (
                <Grid item xs={field.gridSize}>
                    <Typography variant="body2" color="initial">
                        {field.name}
                    </Typography>
                </Grid>
            );
        case FieldType.GridBreak:
            return (
                <Box width="100%" />
            );
        case FieldType.LargeText:
            return (
                <Grid item xs={field.gridSize}>
                    <TextFieldLarge
                        fullWidth={false}
                        key={field.name}
                        label={field.label}
                        type={field.name}
                        value={formData[field.name] || ''}
                    />
                </Grid>
            );
        case FieldType.LargePassword:
            return (
                <Grid item xs={field.gridSize}>
                    <TextFieldLarge
                        fullWidth={false}
                        key={field.name}
                        label={field.label}
                        type={passwordVisible !== true ? "password" : "text"}
                        value={formData[field.name] || ''}
                        endAdornment={
                            field.name === "password" && (passwordVisible ? (
                                <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                                    <VisibilityOutlined />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                                    <VisibilityOff />
                                </IconButton>
                            ))
                        }
                    />
                </Grid>
            );
        case FieldType.Text:
        case FieldType.Email:
        case FieldType.Password:
            return (
                <Grid item xs={field.gridSize}>

                    <TextFieldUi
                        key={field.name}
                        type={field.type}
                        label={field.label}
                        value={field.value}
                        // value={formData[field.name] || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (setFormData) {
                                setFormData(field.name, e.target.value);
                            }
                        }}
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                    />
                </Grid>
            );
        case FieldType.Number:
            return (
                <Grid item xs={field.gridSize}>
                    <TextFieldUi
                        key={field.name}
                        type={field.type}
                        label={field.label}
                        value={formData[field.name] || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && setFormData) {
                                setFormData(field.name, value);
                            }
                        }}
                        error={touched[field.name] && Boolean(errors[field.name])} // Check if field is touched and has an error
                        helperText={touched[field.name] && errors[field.name]}
                    />
                </Grid>
            );
        case FieldType.Date:
            return (
                <Grid item xs={field.gridSize}>
                    <DatePickerUi
                        key={field.name}
                        label={field.label}
                        onChange={(date: any) => {
                            if (setFormData) {
                                setFormData(field.name, date);
                            }
                        }}
                        value={formData[field.name] || ''}
                    />
                </Grid>

            );
        case FieldType.Radio:
            return (
                <Grid item xs={field.gridSize}>
                    <RadioUi
                        key={field.name}
                        label={field.label}
                        options={field.options}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (setFormData) {
                                setFormData(field.name, e.target.value);
                            }
                        }}
                        value={formData[field.name] || ''}
                        // errorMsg={touched[field.name] && Boolean(errors[field.name])}
                        errorMsg={touched[field.name] && errors[field.name]}
                    />
                </Grid >
            );
        case FieldType.SelectDropdown:
            return (
                <Grid item xs={field.gridSize}>
                    <SelectDropdown
                        onChange={(newValue: any) => {
                            if (setFormData) { // Ensure setFormData is defined
                                if (newValue) {
                                    console.log(newValue);
                                    setFormData(field.name, newValue.value);
                                } else {
                                    console.log("clearing the value");
                                    setFormData(field.name, null); // Set to null when clearing the value
                                }
                            }
                        }}
                        options={field.options}
                        value={formData[field.name] ? { value: formData[field.name], label: formData[field.name] } : null}
                        labelText={field.name}
                        error={touched[field.name] && Boolean(errors[field.name])} // Check if field is touched and has an error
                        helperText={touched[field.name] && errors[field.name]}
                    />
                </Grid>
            );

        default:
            return null;
    }
};

export default FormFieldRenderer;
