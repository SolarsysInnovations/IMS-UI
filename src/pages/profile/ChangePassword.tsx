import { Box, Grid } from "@mui/material";
import { Form, Formik,Field } from "formik";
import React, { useEffect, useState } from "react"
import TableHeader from "../../components/layouts/TableHeader";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import TextFieldUi from "../../components/ui/TextField";
import { useNavigate } from "react-router-dom";
import { ChangePasswordInitialValue } from "../../constants/forms/formikInitialValues";
import { PasswordValidationSchema } from "../../constants/forms/validations/validationSchema";
import { ChangePasswordInitialValueProps } from "../../types/types";
import { useChangePasswordMutation, useRolesGetUserMutation } from "../../redux-store/role/roleApi";
import { string } from "yup";
import useSuccessToast from "../../hooks/useToast";


interface ChangePasswordProps {
    onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {

    const pathname = "Change Password"
    const navigate = useNavigate();
    const [passwordValues, setpasswordValues] = useState(ChangePasswordInitialValue);
    const [changePassword, { isSuccess, isError }] = useChangePasswordMutation();
    const [rolesGetUser] = useRolesGetUserMutation();
    const [userPassword, setUserPassword] = useState<string>();
    const userName = localStorage.getItem("userName");
    
    useEffect(() => {
        if (userName) {
            rolesGetUser(userName).then(response => {
                if (response && response.data) {
                    let pwd = (response[`data`] && response[`data`][`password`]) ? response[`data`][`password`] : '';
                    setUserPassword(pwd);
                }                
            })
        } 
    }, [userName, rolesGetUser]);
     
    const handleSubmit = async (values: ChangePasswordInitialValueProps, { setSubmitting, resetForm, setFieldError }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void;  setFieldError: (field: string, message: string) => void }) => {
        try {
           if (values.currentPassword !== userPassword) {
                setFieldError('currentPassword', 'Current password is incorrect');
                setSubmitting(false);
                return;
            }
            await changePassword({
                userName: userName ? userName : '',
                values: values
            });
            resetForm();
            onClose();
            console.log("Password change successfully!");
        } catch (error) {
            console.error("An error occurred during sendemail:", error);
        } finally {
            setSubmitting(false);
        }
    };

    useSuccessToast({ isSuccess, message: "Password update successfully", });
    
    return (
        <>
            <Formik initialValues={passwordValues} validationSchema={PasswordValidationSchema} validateOnChange={true} validateOnBlur={true} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box>
                                    <TableHeader headerName={pathname} />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <TextFieldUi
                                        required={true}
                                        fullWidth={false}
                                        label="Current Password"
                                        name="currentPassword"
                                        type="password"
                                        value={values.currentPassword}
                                        onChange={handleChange}
                                        // error={meta.touched && !!meta.error}
                                        // helperText={meta.touched && meta.error}
                                        error={touched.currentPassword && Boolean(errors.currentPassword)}
                                        helperText={touched.currentPassword && errors.currentPassword}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <TextFieldUi
                                    required={true}
                                    fullWidth={false}
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    value={(() => {
                                        return values.newPassword;
                                    })()}
                                    onChange={handleChange}
                                    error={touched.newPassword && Boolean(errors.newPassword)}
                                    helperText={touched.newPassword && errors.newPassword}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <TextFieldUi
                                    required={true}
                                    fullWidth={false}
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={(() => {
                                        return values.confirmPassword;
                                    })()}
                                    onChange={handleChange}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mt: 1,gap: 1, display: "flex", float: "right" }}>
                                    <ButtonSmallUi color="primary" label="Cancel" size="small" variant="contained" type="button" onClick={() => navigate(-1) } />
                                    <ButtonSmallUi color="primary" label="Update" size="small" variant="contained" type="submit"/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );

}

export default ChangePassword;


