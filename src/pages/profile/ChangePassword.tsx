import { Box, Grid, IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import TableHeader from "../../components/layouts/TableHeader";
import TextFieldUi from "../../components/ui/TextField";
import { ChangePasswordInitialValue } from "../../constants/forms/formikInitialValues";
import { PasswordValidationSchema } from "../../constants/forms/validations/validationSchema";
import { ChangePasswordInitialValueProps } from "../../types/types";
import { useChangePasswordMutation } from "../../redux-store/role/roleApi";
import {
  KeyboardBackspaceTwoTone,
  Save,
  VisibilityOff,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import { useInVoiceContext } from "../../invoiceContext/invoiceContext";

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const context = useInVoiceContext();
  const pathname = "Change Password";
  const [passwordValues, setpasswordValues] = useState(
    ChangePasswordInitialValue
  );
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [
    changePassword,
    {
      isSuccess: changePasswordSuccess,
      isError: changePasswordError,
      error: changePasswordErrorObject,
    },
  ] = useChangePasswordMutation();
  const userName = context.userDetails.userName;
  const buttons = [
    { label: "Back", icon: KeyboardBackspaceTwoTone, onClick: () => onClose() },
    { label: "Update", icon: Save, onClick: () => handleSubmit },
  ];

  useSnackbarNotifications({
    error: changePasswordError,
    errorMessage: "Error changing password",
    success: changePasswordSuccess,
    successMessage: "Password update successfully",
    errorObject: changePasswordErrorObject,
  });

  const handleSubmit = async (
    values: ChangePasswordInitialValueProps,
    {
      setSubmitting,
      resetForm,
      setFieldError,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
      setFieldError: (field: string, message: string) => void;
    }
  ) => {
    try {
      await changePassword({
        userName: userName ?? "",
        values: values,
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error("An error occurred during sendemail:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={passwordValues}
      validationSchema={PasswordValidationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <TableHeader headerName={pathname} buttons={buttons} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TextFieldUi
                  required={true}
                  fullWidth={true}
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onPaste={(e) => e.preventDefault()}
                  error={
                    touched.currentPassword && Boolean(errors.currentPassword)
                  }
                  helperText={touched.currentPassword && errors.currentPassword}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TextFieldUi
                  sx={{ padding: "8px 0" }}
                  endAdornment={
                    <IconButton
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  }
                  required={true}
                  fullWidth={false}
                  label="New Password"
                  name="newPassword"
                  type={newPasswordVisible ? "text" : "password"}
                  value={values.newPassword}
                  onChange={handleChange}
                  onPaste={(e) => e.preventDefault()}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TextFieldUi
                  sx={{ padding: "8px 0" }}
                  endAdornment={
                    <IconButton
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  }
                  required={true}
                  fullWidth={false}
                  label="Confirm Password"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />{" "}
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
