import { Field, FieldArray, useFormikContext } from "formik";
import SelectDropdown from "../ui/SelectDropdown";
import TextFieldUi from "../ui/TextField";
import RadioUi from "../ui/RadioGroup";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import ButtonSmallUi from "../ui/ButtonSmall";
import { FieldProps, SubField } from "../../types/types";
import DatePickerUi from "../ui/DatePicker";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';

// Dropdown
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
                        if (newValue) {
                            onChange(newValue.value);
                            setFieldValue(subField.name, newValue.value);
                        } else {
                            setFieldValue(subField.name, '');
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
        value={field.value || ""}
        startAdornment={subField.startAdornment ? <span>{subField.startAdornment}</span> : undefined}
        endAdornment={subField.endAdornment ? <span>{subField.endAdornment}</span> : undefined}
        type={subField.type}
        fullWidth
        id={subField.name}
        label={subField.label}
        error={meta.touched && !!meta.error}
        helperText={subField?.helperText}
    />
);

const renderDatePickerField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => (
    <DatePickerUi
        {...field}
        label={subField.label}
        value={field.value}
        onChange={(date: any) => {
            if (date) {
                setFieldValue(subField.name, date);
            } else {
                setFieldValue(subField.name, '');
            }
        }}
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
        <RadioUi errorMsg={meta.touched && meta.error} options={options} value={field.value} onChange={(newValue: any) => {
            if (newValue) {
                setFieldValue(subField.name, newValue.target.value);
            } else {
                setFieldValue(subField.name, '');
            }
        }}
        />
    );
};
type FormFieldProps = {
    [key: string]: string;
};
interface FieldRendererProps {
    updateFormValue: any;
    setData: any;
    field: FieldProps;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ updateFormValue, field, setFieldValue, setData }) => {
    const { values } = useFormikContext<FormFieldProps>();

    // Memoize the updateFormValue function to prevent unnecessary re-renders
    const memoizedUpdateFormValue = useMemo(() => updateFormValue, [updateFormValue]);

    useEffect(() => {
        if (setData) {
            setData(values);
        }
    }, [values, setData])

    useEffect(() => {
        if (memoizedUpdateFormValue) {
            memoizedUpdateFormValue(setFieldValue);
        }
    }, [memoizedUpdateFormValue, setFieldValue]);


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
                                {({ field, meta }: any) => {
                                    if (subField.type === "date") {
                                        return renderDatePickerField(field, meta, subField, setFieldValue);
                                    } else if (subField.type === "select") {
                                        return renderSelectField(field, meta, subField, setFieldValue);
                                    } else if (subField.type === "radio") {
                                        return renderRadioField(field, meta, subField, setFieldValue);
                                    } else {
                                        return renderTextField(field, meta, subField);
                                    }
                                }}
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
                                        <Grid sx={{ display: "flex" }}>
                                            <Box sx={{ border: '1px solid #c4c4c4', borderRadius: 2, p: 1, height: "17px", display: "flex", ml: 3 }}>
                                                <IconButton size='small' onClick={() => remove(index)}>
                                                    <DeleteIcon sx={{ color: `#ed5d5a`, fontSize: "18px" }} />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ border: '1px solid #c4c4c4', borderRadius: 2, p: 1, height: "17px", display: "flex", ml: 3 }}>
                                                <IconButton size='small' color="primary" onClick={() => push({})}>
                                                    <AddIcon sx={{ fontSize: "18px" }} />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </React.Fragment>
                                ))}

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
