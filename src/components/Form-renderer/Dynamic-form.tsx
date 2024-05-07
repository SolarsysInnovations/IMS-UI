import { useNavigate } from "react-router-dom";
import usePathname from "../../hooks/usePathname";
import { FieldProps, FormProps } from "../../types/types";
import { Form, Formik } from "formik";
import TableHeader from "../layouts/TableHeader";
import { Grid } from "@mui/material";
import { FieldRenderer } from "./Form-fields-renderer";
import { Add } from "@mui/icons-material";
import { useState } from "react";

export const DynamicFormCreate: React.FC<FormProps> = ({ showTable, fields, initialValues, validationSchema, onSubmit }) => {

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
                        {showTable && (
                            <TableHeader headerName={pathname} buttons={[
                                { label: 'Back', icon: Add, onClick: () => navigate(-1) },
                                { label: 'Save', icon: Add, onClick: handleSubmit },
                            ]} />
                        )}
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