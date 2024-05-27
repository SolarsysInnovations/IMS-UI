import React, { useState } from "react";
import { Form, Formik } from "formik";
// import { Editor } from "@toast-ui/react-editor";
// import "@toast-ui/editor/dist/toastui-editor.css";
import { Box, Grid, Button, Typography, IconButton } from "@mui/material";
import TextFieldUi from "../../components/ui/TextField";
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { useSendEmailNotifictionMutation } from "../../redux-store/invoice/invcoiceApi";
import { SendEmailInitialValueProps } from "../../types/types";
import { sendEmailValidationSchema } from "../../constants/forms/validations/validationSchema";
import { SendEmailInitialValue } from '../../constants/forms/formikInitialValues';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CancelIcon from '@mui/icons-material/Close';
// import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import usePathname from "../../hooks/usePathname";
import TableHeader from "../../components/layouts/TableHeader";
import useSuccessToast from "../../hooks/useToast";
import useErrorToast from "../../hooks/useErrorToast";

interface SendEmailProps {
  onClose: () => void;
}

const SendEmail: React.FC<SendEmailProps> = ({ onClose }) => {
  const [sendEmailNotifiction, { isSuccess, isError }] =
    useSendEmailNotifictionMutation();
  const [emailValues, setemailValues] = useState(SendEmailInitialValue);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showfilename, setShowFileName] = useState<String[]>([]);
  const [editor, setEditor] = useState<any>(null); // To keep reference of the editor
  const pathname = 'Send Email'
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileName = files[0].name;
      const fileslist = Array.from(files);
      setUploadedFiles((prevFiles) => [...prevFiles, ...fileslist]);
      setShowFileName([...showfilename, fileName]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    const updatedShowFiles = showfilename.filter((_, i) => i !== index);
    setShowFileName(updatedShowFiles);
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike', 'hr', 'quote', 'ul', 'ol', 'table', 'indent', 'outdent', 'image', 'link']
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
      
      await sendEmailNotifiction(formData);
      resetForm();
      setUploadedFiles([]);
      setShowFileName([]);
      onClose()
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("An error occurred during sendemail:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useSuccessToast({ isSuccess, message: "Email send successfully", });
  useErrorToast({ isError, message: "Email not send successfully", });
  
  return (
    <>
      <Formik initialValues={emailValues} validationSchema={sendEmailValidationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
          <div>
            <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
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
                <Grid item xs={12}>
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
                    <TextFieldUi
                      required={false}
                      fullWidth={false}
                      label="CC"
                      name="cc"
                      type="email"
                      value={values.cc || ""}
                      onChange={handleChange}
                      error={touched.cc && Boolean(errors.cc)}
                      helperText={touched.cc && errors.cc}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TextFieldUi
                      required={false}
                      fullWidth={false}
                      label="Subject"
                      name="subject"
                      type="text"
                      value={values.subject || ""}
                      onChange={handleChange}
                      error={touched.subject && Boolean(errors.subject)}
                      helperText={touched.subject && errors.subject}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onReady={(editor) => {
                        console.log('CKEditor React Component is ready to use!', editor);
                        // CKEditorInspector.attach(editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                      }}
                    />
                  </Box>
                </Grid>
                <Grid container spacing={1}>
                  {showfilename && showfilename.map((fileName, index) => (
                    <>
                      <Grid item xs={5}>
                        <Box sx={{ mt: 1,mb:-1, display: "flex",position:"relative",left:"15px" }}>
                          <Typography>{fileName}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={7}>
                        <Box sx={{ mt: 1, display: "flex" }}>
                          <IconButton onClick={() => handleRemoveFile(index)}>
                            <CancelIcon color="secondary" sx={{ position:"relative"  }}/>
                          </IconButton>
                          </Box>
                      </Grid>
                    </>
                  ))}
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Box sx={{ mt: 3, display: "flex",position:"relative",left:"15px" }}>
                      <Button style={{ height: "26px",width: "fit-content", fontSize: "12px",borderRadius: "8px",boxShadow: "none" }}
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
                          width="0px"
                          onChange={(event) => {
                            handleFileUpload(event);
                          }}
                        />
                        
                      </Button> 
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box sx={{ mt: 3,gap: 1, display: "flex" }}>
                      <ButtonSmallUi color="primary" label="Cancel" size="small" variant="contained" type="button" onClick={() => navigate(-1) } />
                      <ButtonSmallUi color="primary" label="Send" size="small" variant="contained" type="submit"/>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>  
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SendEmail;
