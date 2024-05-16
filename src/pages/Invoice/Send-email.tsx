import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Box, Grid, Button ,Typography} from "@mui/material";
import TextFieldUi from "../../components/ui/TextField";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { useSendEmailNotifictionMutation } from "../../redux-store/invoice/invcoiceApi";
import { SendEmailInitialValueProps } from "../../types/types";
import { sendEmailValidationSchema } from "../../constants/forms/validations/validationSchema";
import { SendEmailInitialValue } from '../../constants/forms/formikInitialValues';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import usePathname from "../../hooks/usePathname";
import TableHeader from "../../components/layouts/TableHeader";

const SendEmail = () => {
  const [sendEmailNotifiction, { isSuccess, isError }] =
    useSendEmailNotifictionMutation();
  const [emailValues, setemailValues] = useState(SendEmailInitialValue);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [editor, setEditor] = useState<any>(null); // To keep reference of the editor
  const pathname = 'Send Email'

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFiles([...uploadedFiles, file.name]);
      // Handle file upload logic here
      console.log("Uploaded file:", file);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike', 'hr', 'quote', 'ul', 'ol','table','indent','outdent','image', 'link']
  ];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSubmit = async (values: Partial<SendEmailInitialValueProps>,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const formData = new FormData();
      formData.append("recipientEmail", values.recipientEmail || "");
      uploadedFiles.forEach((file) => {
        formData.append("file", file);
      });
      console.log("formData", formData);
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
      <Formik initialValues={emailValues} validationSchema={sendEmailValidationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
            <div>
              <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="h5" color="initial">
                        {pathname}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={10}>
                      <Box>
                        <TextFieldUi
                            required={true}
                            fullWidth={false}
                            label="From Email"
                            name="fromemail"
                            type="email"
                            value={(() => {
                              return values.fromemail;
                            })()}
                            onChange={handleChange}
                            error={touched.fromemail && Boolean(errors.fromemail)}
                            helperText={touched.fromemail && errors.fromemail}
                          />
                      </Box>
                  </Grid>
                  {/* {errors.fromemail && touched.fromemail && (
                    <div style={{ color: "red" }}>{errors.fromemail}</div>
                  )} */}
                  <Grid item xs={10}>
                    <Box>
                    <TextFieldUi
                      required={true}
                      fullWidth={false}
                      label="To Email"
                      name="recipientEmail"
                      type="email"
                      value={values.recipientEmail || ""}
                      onChange={handleChange}
                      error={touched.recipientEmail && Boolean(errors.recipientEmail)}
                      helperText={touched.recipientEmail && errors.recipientEmail}
                    />
                    </Box>
                  </Grid>
                  {/* {errors.recipientEmail && touched.recipientEmail && (
                    <div style={{ color: "red" }}>{errors.recipientEmail}</div>
                  )} */}
                  <Grid item xs={12}>
                    <Box>
                      <Editor
                        initialValue=""
                        previewStyle="vertical"
                        height="280px"
                        initialEditType="wysiwyg"
                        hideModeSwitch={true}
                        toolbarItems={toolbarItems}
                        ref={(editor: any) => setEditor(editor)}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Box sx={{ mt: 3, display: "flex" }}>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          id="fileInput"
                          type="file"
                          onChange={(event) => {
                            handleFileUpload(event);
                            setFieldValue("file", event.currentTarget.files?.[0] || null);
                          }}
                        />
                      </Button> 
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box sx={{ mt: 3, display: "flex" }}>
                      <ButtonSmallUi color="primary" label="Send" size="small" variant="contained" type="submit"/>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {uploadedFiles && uploadedFiles.map((fileName, index) => (
                    <>
                      <Grid item xs={5}>
                        <Box sx={{ mt: 1, display: "flex" }}>
                          <Typography>{fileName}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={7}>
                        <Box sx={{ mt: 1, display: "flex" }}>
                          <ButtonSmallUi color="secondary" onClick={() => handleRemoveFile(index)} label="Remove"/>
                        </Box>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Form>
            </div>
        )}
      </Formik>
    </>
  );
};

export default SendEmail;