import { Field, FieldArray } from "formik";
import SelectDropdown from "../ui/SelectDropdown";
import TextFieldUi from "../ui/TextField";
import RadioUi from "../ui/RadioGroup";
import { Grid, Typography } from "@mui/material";
import React from "react";
import ButtonSmallUi from "../ui/ButtonSmall";
import { FieldProps, SubField } from "../../types/types";

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
            if (newValue) {
                setFieldValue(subField.name, newValue.target.value);
            } else {
                setFieldValue(subField.name, '');
            }
        }}
        />
    );
};


export const FieldRenderer: React.FC<{ field: FieldProps; setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void }> = ({ field, setFieldValue }) => {
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
