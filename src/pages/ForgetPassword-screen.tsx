// import { Alert, Box, Button, FormHelperText, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";
// import ButtonUi from "../components/ui/Button";
// import Link from '@mui/material/Link';
// import palette from "../theme/create-pallet";
// import TabUi from "../components/ui/Tabs";
// import { Formik, Form, Field, FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from "react-router-dom";

// interface Values {
//     email: string;
//     createPassword: string;
//     reEnterPassword: string;
// }

// const ForgetPassword = () => {
//     const navigate = useNavigate();
//     const validationSchema = Yup.object({
//         email: Yup.string()
//             .email('Must be a valid email')
//             .max(255)
//             .required('Email is required'),
//         createPassword: Yup.string()
//             .min(7)
//             .required('Password is required'),
//     });

//     return (
//         <Formik
//             initialValues={{
//                 email: "",
//                 createPassword: "",
//                 reEnterPassword: "",
//             }}
//             validationSchema={validationSchema}
//             onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
//                 setTimeout(() => {
//                     alert(JSON.stringify(values, null, 2));
//                     setSubmitting(false);
//                 }, 500);
//             }}
//         >
//             {({ errors, touched, values, handleChange }) => (
//                 <Box
//                     sx={{
//                         mt: 3, backgroundColor: "background.paper", flex: "1 1 auto", alignItems: "center", display: "flex", justifyContent: "center",
//                     }}
//                 >
//                     <Box
//                         sx={{ maxWidth: 500, px: 3, py: "10px", width: "100%", }}
//                     >
//                         <div>
//                             <Stack spacing={1} sx={{ mb: 3 }} >
//                                 <Typography variant='h4'>Forget Password</Typography>
//                             </Stack>
//                             <Box sx={{ mb: 2 }}>

//                             </Box>
//                             <Form noValidate>
//                                 <Stack spacing={3}>

//                                     <TextField
//                                         fullWidth
//                                         label='Enter Your Mail'
//                                         name='email'
//                                         type='email'
//                                         value={values.email}
//                                         onChange={handleChange}
//                                         error={touched.email && Boolean(errors.email)}
//                                         helperText={touched.email && errors.email}
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         label='Create Password'
//                                         name='createPassword'
//                                         type='password'
//                                         value={values.createPassword}
//                                         onChange={handleChange}
//                                         error={touched.createPassword && Boolean(errors.createPassword)}
//                                         helperText={touched.createPassword && errors.createPassword}
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         label='Re Enter Password'
//                                         name='reEnterPassword'
//                                         type='password'
//                                         value={values.reEnterPassword}
//                                         onChange={handleChange}
//                                         error={touched.reEnterPassword && Boolean(errors.reEnterPassword)}
//                                         helperText={touched.reEnterPassword && errors.reEnterPassword}
//                                     />
//                                 </Stack>
//                                 {/* <FormHelperText sx={{ mt: 1 }}><Link underline="none" href="/forgetPassword" >Forget Password ?</Link></FormHelperText> */}
//                                 <Box sx={{ mt: 3 }}>
//                                     <ButtonUi color="primary" label='Submit' variant='contained' type='submit' />
//                                 </Box>
//                                 <Box sx={{ mt: 1 }}>
//                                     <ButtonUi onClick={() => navigate("/login")} label='Go Back To Login' />
//                                 </Box>
//                             </Form>
//                         </div>
//                     </Box>
//                 </Box>
//             )}
//         </Formik>
//     );
// };

// export default ForgetPassword;


import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
    Card,
    CardContent
} from "@mui/material";
 
const ForgotPassword = () => {
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const data = new FormData(e.currentTarget);
    //     const email = data.get("email");
    //     const url = process
    //                     .env
    //                     .REACT_APP_BACKEND_URL + "/api/forgotPassword";
    //     const res = await axios.post(url, { email: email });
    //     if (res.data.success === false) {
    //         toast.error(res.data.message, {
    //             autoClose: 5000,
    //             position: "top-right",
    //         });
    //     } else {
    //         toast.success(res.data.message, {
    //             autoClose: 5000,
    //             position: "top-right",
    //         });
    //     }
    // };
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Card sx={{ boxShadow: "4" }}>
                    <CardContent sx={{ m: 3 }}>
                        <Avatar sx={{
                            m: "auto",
                            bgcolor: "primary.main"
                        }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1"
                            variant="h5" sx={{ mt: 1 }}>
                            Forgot Password
                        </Typography>

                        <Box component="form"
                         //   onSubmit={handleSubmit}
                             sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset Password
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
