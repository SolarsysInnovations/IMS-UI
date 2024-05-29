import { Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react"
import TableHeader from "../layouts/TableHeader";
import ButtonSmallUi from "./ButtonSmall";
import TextFieldUi from "./TextField";
import { useNavigate } from "react-router-dom";
import { ChangePasswordInitialValue } from "../../constants/forms/formikInitialValues";
import { PasswordValidationSchema } from "../../constants/forms/validations/validationSchema";
import { ChangePasswordInitialValueProps } from "../../types/types";
import { useChangePasswordMutation, useRolesGetUserMutation } from "../../redux-store/role/roleApi";

const ChangePassword = () => {

    const pathname = "Change Password"
    const navigate = useNavigate();
    const [passwordValues, setpasswordValues] = useState(ChangePasswordInitialValue);
    const [changePassword, { isSuccess, isError }] = useChangePasswordMutation();
    const [rolesGetUser] = useRolesGetUserMutation();
    const [userPassword, setUserPassword] = useState();
    const [userData, setUserData] = useState();
    const userName=localStorage.getItem("userName");

    useEffect(() => {
        if (userName) {
            rolesGetUser(userName).then(response => {
                if (response && response.data) {
                    setUserData(response[`data`]);
                    // console.log("response", response);
                }                
            })
        } 
    }, [userName, rolesGetUser]);

    const handleSubmit = async (values: Partial<ChangePasswordInitialValueProps>,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try{      
    //   await changePassword(values);
      console.log(values)
      resetForm();
      console.log("Password change successfully!");
    } catch (error) {
      console.error("An error occurred during sendemail:", error);
    } finally {
      setSubmitting(false);
    }
  };
    
    return (
        <>
            <Formik initialValues={passwordValues} validationSchema={PasswordValidationSchema} validateOnChange={true} validateOnBlur={true} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box>
                                    <TableHeader headerName={pathname} />
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Box>
                                    <TextFieldUi
                                    required={true}
                                    fullWidth={false}
                                    label="Current Password"
                                    name="currentPassword"
                                    type="password"
                                    value={(() => {
                                        return values.currentPassword;
                                    })()}
                                    onChange={handleChange}
                                    error={touched.currentPassword && Boolean(errors.currentPassword)}
                                    helperText={touched.currentPassword && errors.currentPassword}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
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
                            <Grid item xs={7}>
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
                            <Grid item xs={2}>
                                <Box sx={{ mt: 3,gap: 1, display: "flex" }}>
                                    <ButtonSmallUi color="primary" label="Cancel" size="small" variant="contained" type="button" onClick={() => navigate(-1) } />
                                    <ButtonSmallUi color="primary" label="Send" size="small" variant="contained" type="submit"/>
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