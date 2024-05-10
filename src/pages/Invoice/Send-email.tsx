import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Box, Grid, Button } from "@mui/material";
import TextFieldUi from "../../components/ui/TextField";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { useSendEmailNotifictionMutation } from "../../redux-store/invoice/invcoiceApi";
import { SendEmailInitialValueProps } from "../../types/types";
import { sendEmailValidationSchema } from "../../constants/forms/validations/validationSchema";
import { useNavigate } from "react-router-dom";

const SendEmail = () => {
  const [sendEmailNotifiction, { isSuccess, isError }] =
    useSendEmailNotifictionMutation();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFiles([...uploadedFiles, file.name]);
      // Handle file upload logic here
      console.log("Uploaded file:", file);
    }
  };

  const handleSubmit = async (
    values: SendEmailInitialValueProps,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const formData = new FormData();

      // Append form data
      formData.append("recipientEmail", values.toemail);
      uploadedFiles.forEach((file, index) => {
        formData.append(`file`, file);
      });

      await sendEmailNotifiction(formData);
      resetForm();
      setUploadedFiles([]);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("An error occurred during sendemail:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ButtonSmallUi
        label="Back"
        variant="contained"
        size="small"
        onClick={() => navigate(-1)}
      />
      <Formik
        initialValues={{ fromemail: "", toemail: "", description: "" }}
        validationSchema={sendEmailValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <Grid
                item
                xs={6}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              >
                <TextFieldUi
                  required={true}
                  fullWidth={false}
                  label="FromEmail"
                  name="fromemail"
                  width="600px"
                  type="email"
                  value={(() => {
                    return values.fromemail;
                  })()}
                  onChange={handleChange}
                  error={touched.fromemail && Boolean(errors.fromemail)}
                  helperText={touched.fromemail && errors.fromemail}
                />
              </Grid>
              {errors.fromemail && touched.fromemail && (
                <div style={{ color: "red" }}>{errors.fromemail}</div>
              )}
            </div>

            <div>
              <Grid item xs={6} style={{ marginBottom: "10px" }}>
                <TextFieldUi
                  required={true}
                  fullWidth={false}
                  label="ToEmail"
                  name="toemail"
                  width="600px"
                  type="email"
                  value={(() => {
                    return values.toemail;
                  })()}
                  onChange={handleChange}
                  error={touched.toemail && Boolean(errors.toemail)}
                  helperText={touched.toemail && errors.toemail}
                />
              </Grid>
              {errors.toemail && touched.toemail && (
                <div style={{ color: "red" }}>{errors.toemail}</div>
              )}
            </div>
            <div className="custom-editor">
              <Editor
                initialValue=""
                previewStyle="vertical"
                height="300px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
              />
            </div>
            <div style={{ display: "flex" }}>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  component="label"
                  htmlFor="file-upload"
                  className="hidden-file-upload-button"
                >
                  Choose File
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </Button>
                <ButtonSmallUi
                  color="primary"
                  label="Send"
                  size="small"
                  variant="contained"
                  type="submit"
                />
              </Box>
            </div>
            <Box sx={{ mt: 3 }}>
              {uploadedFiles.map((fileName, index) => (
                <div key={index}>{fileName}</div>
              ))}
            </Box>

            {/* <ButtonSmallUi
                color="primary"
                label="Send"
                size="small"
                variant="contained"
                type="submit"
              /> */}
          </form>
        )}
      </Formik>
    </>
  );
};

export default SendEmail;
