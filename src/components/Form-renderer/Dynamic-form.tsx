// src/components/Form-renderer/Dynamic-form.tsx

import { useNavigate } from "react-router-dom";
import usePathname from "../../hooks/usePathname";
import { FieldProps, FormProps } from "../../types/types";
import { Form, Formik } from "formik";
import TableHeader from "../layouts/TableHeader";
import { Grid } from "@mui/material";
import { FieldRenderer } from "./Form-fields-renderer";
import { Add } from "@mui/icons-material";
import SnackBarUi from "../ui/Snackbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { clearData } from "../../redux-store/global/globalState";

export const DynamicFormCreate = ({ buttons, toastMessage, isSuccessToast, error, headerName, setData, updateFormValue, showTable, fields, initialValues, validationSchema, onSubmit, onClose }: FormProps) => {

    const pathname = usePathname();
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    
    const handleClick = () => {
        dispatch(clearData());
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, values, handleChange, handleSubmit, setFieldValue, isValid, dirty }) => {

                    const defaultButtons = [
                        { label: 'Back', icon: Add, onClick: handleClick },
                        { label: 'Save', icon: Add, onClick: handleSubmit, disabled: !(isValid && dirty) } // Use handleSubmit here
                    ];

                    const resolvedButtons = buttons ? buttons.map((button: any) => ({
                        ...button,
                        onClick: button.label === 'Save' ? handleSubmit : button.onClick
                    })) : defaultButtons;

                    return (
                        <>
                            {showTable && (
                                <TableHeader
                                    headerName={headerName || pathname}
                                    buttons={resolvedButtons}
                                />
                            )}
                            <Form>
                                {fields?.map((field: FieldProps) => (
                                    <Grid key={field.name} container spacing={2}>
                                        <FieldRenderer updateFormValue={updateFormValue} setData={setData} field={field} setFieldValue={setFieldValue} />
                                    </Grid>
                                ))}
                            </Form>
                            <SnackBarUi
                                message={isSuccessToast ? `${toastMessage}` : `Error: ${error?.message || 'Unknown error occurred'}`}
                                severity={isSuccessToast ? "success" : "error"}
                                isSubmitting={isSuccessToast}
                            />
                        </>
                    )
                }}
            </Formik>
        </div>
    );
};
