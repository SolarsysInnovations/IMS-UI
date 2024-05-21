import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Box, Grid, Button ,Typography} from "@mui/material";
import { RoleInitialValue } from '../../constants/forms/formikInitialValues';
import { RoleValidationSchema } from '../../constants/forms/validations/validationSchema';
import TextFieldUi from '../../components/ui/TextField';
import { RoleInitialValueProps } from '../../types/types';
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SelectDropdown from '../../components/ui/SelectDropdown';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { useAddRoleMutation } from '../../redux-store/role/roleApi';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/forms/config/toastConfig';

const RolesCreate: React.FC = () => {

    const roleOptions = [
        {
            value: "superAdmin",
            label: "Super Admin"
        },
        {
            value: "admin",
            label: "Admin"
        },
        {
            value: "approver",
            label: "Approver"
        },
        {
            value: "endUser",
            label: "End User"
        },
    ]

    const accessOptions = [
        {
            value: "fullaccess",
            label:"Full access"
        },
        {
            value: "limitedaccess",
            label:"Limited access"
        }
    ]

    const [AddRole, { isSuccess, isError }] =
    useAddRoleMutation();
    const [roleValues, setroleValues] = useState(RoleInitialValue);
    const pathname = 'Role Create '
    const navigate = useNavigate();

     useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new Role", toastConfig)
        }
    }, [isSuccess])

    const handleSubmit = async (values: Partial<RoleInitialValueProps>,
        {
            setSubmitting,
            resetForm,
        }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ) => { 
        try {
      const formData = new FormData();
      formData.append("username", values.userName||"");
      formData.append("userEmail", values.email||"");
      formData.append("password",values.password||"");
      formData.append("userRole",values.role||"");
      
      await AddRole(formData);
      resetForm();
      setroleValues({...RoleInitialValue})
    } catch (error) {
      console.error("An error occurred during create role:", error);
    } finally {
      setSubmitting(false);
    }
    };
       

    return (
        <div>
            <TableHeader headerName={pathname} />
            <Formik initialValues={roleValues} validationSchema={RoleValidationSchema} onSubmit={handleSubmit} >
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <div>
                        <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box>
                                    <TextFieldUi
                                        required={true}
                                        fullWidth={false}
                                        label="User Name"
                                        name="userName"
                                        type="text"
                                        value={(() => {
                                        return values.userName;
                                        })()}
                                        onChange={handleChange}
                                        error={touched.userName && Boolean(errors.userName)}
                                        helperText={touched.userName && errors.userName}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <SelectDropdown
                                        onChange={(newValue: any) => {
                                            if (newValue) {
                                                setFieldValue("role", newValue.value)
                                            }
                                            else {
                                                setFieldValue("role", "")
                                            }
                                        }}
                                        options={roleOptions}
                                        value={values.role?{value:values.role,label:values.role}:null}
                                        labelText='Role'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <TextFieldUi
                                        required={true}
                                        fullWidth={false}
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={(() => {
                                        return values.email;
                                        })()}
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <SelectDropdown
                                        onChange={(newValue: any) => {
                                            if (newValue) {
                                                setFieldValue("access", newValue.value)
                                            }
                                            else {
                                                setFieldValue("access", "")
                                            }
                                        }}
                                        options={accessOptions}
                                        value={values.access?{value:values.access,label:values.access}:null}
                                        labelText='Access'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <TextFieldUi
                                        required={true}
                                        fullWidth={false}
                                        label="Password"
                                        name="password"
                                        type="text"
                                        value={(() => {
                                        return values.password;
                                        })()}
                                        onChange={handleChange}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={3} >
                                <Box sx={{position:"relative",left:"210px",top:"20px"}}>
                                    <ButtonSmallUi color="primary" label="Save" size="small" variant="contained" type="submit" onClick={handleSubmit} />
                                </Box>
                            </Grid>
                        </Grid>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );

};




export default RolesCreate;