import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Grid, IconButton } from "@mui/material";
import { RoleInitialValue } from '../../constants/forms/formikInitialValues';
import { RoleValidationSchema } from '../../constants/forms/validations/validationSchema';
import TextFieldUi from '../../components/ui/TextField';
import SelectDropdown from '../../components/ui/SelectDropdown';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { useAddRoleMutation, useUpdateRoleMutation, useGetRoleByIdMutation, useGetRoleQuery } from '../../redux-store/role/roleApi';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { RoleInitialValueProps } from '../../types/types';
import { useDispatch } from 'react-redux';
import TableHeader from '../../components/layouts/TableHeader';
import { Add, VisibilityOff, VisibilityOutlined } from '@mui/icons-material';

interface RoleFormProps {
    roleId?: string | null;
    onClose: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ roleId, onClose }) => {
    const [addRole, { isSuccess, isError }] = useAddRoleMutation();
    const [updateRole] = useUpdateRoleMutation();
    const [GetRoleById] = useGetRoleByIdMutation();
    const [initialValues, setInitialValues] = useState(RoleInitialValue);
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        if (roleId) {
            GetRoleById(roleId).then(response => {
                if (response && response.data) {
                    setInitialValues(response['data']);
                }
            });
        }
    }, [roleId, dispatch, GetRoleById]);

    const handleSubmit = async (values: RoleInitialValueProps, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }) => {
        try {
            if (roleId) {
                await updateRole({ id: values.id, roles: values });
                toast.success("Role successfully updated", toastConfig);
            } else {
                const formData = !roleId ? Object.fromEntries(Object.entries(values).filter(([key, value]) => key !== 'id')) : values;

                await addRole(formData);
                toast.success("Role successfully created", toastConfig);
            }
            resetForm();
            onClose();
        } catch (error) {
            toast.error("An error occurred", toastConfig);
            console.error("An error occurred:", error);
        } finally {
            setSubmitting(false);
        }
    };


    const buttons: any = [];

    if (initialValues.id == "") {
        buttons.push({ label: 'Save', icon: Add, onClick: () => handleSubmit })
    } else {
        buttons.push({ label: 'Update', icon: Add, onClick: () => handleSubmit })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={RoleValidationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {values && values.id && (
                                <Box>
                                    <TableHeader headerName="Edit Role" buttons={buttons} />
                                </Box>
                            )}
                            {initialValues.id == "" && (
                                <Box>
                                    <TableHeader headerName="Add Role" buttons={buttons} />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <TextFieldUi
                                    required
                                    fullWidth={false}
                                    label="User Name"
                                    name="username"
                                    type="text"
                                    value={values.username}
                                    onChange={handleChange}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <SelectDropdown
                                    onChange={(newValue: any) => setFieldValue("userRole", newValue?.value || "")}
                                    options={roleOptions}
                                    value={values.userRole ? { value: values.userRole, label: values.userRole } : null}
                                    labelText="Role"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <TextFieldUi
                                    required
                                    fullWidth={false}
                                    label="Email"
                                    name="userEmail"
                                    type="email"
                                    value={values.userEmail}
                                    onChange={handleChange}
                                    error={touched.userEmail && Boolean(errors.userEmail)}
                                    helperText={touched.userEmail && errors.userEmail}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <SelectDropdown
                                    onChange={(newValue: any) => setFieldValue("userAccess", newValue?.value || "")}
                                    options={accessOptions}
                                    value={values.userAccess ? { value: values.userAccess, label: values.userAccess } : null}
                                    labelText="Access"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                {initialValues.id == "" && (
                                    <TextFieldUi
                                        endAdornment={passwordVisible ? <IconButton onClick={() => {
                                            setPasswordVisible(!passwordVisible)
                                        }}>
                                            <VisibilityOutlined />
                                        </IconButton> : <IconButton onClick={() => {
                                            setPasswordVisible(!passwordVisible)
                                        }}>
                                            <VisibilityOff />
                                        </IconButton>}
                                        required
                                        fullWidth={false}
                                        label="Password"
                                        name="password"
                                        type={!passwordVisible ? 'password' : "text"}
                                        value={values.password}
                                        onChange={handleChange}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export const roleOptions = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "APPROVER", label: "APPROVER" },
    { value: "ENDUSER", label: "ENDUSER" }
];

export const accessOptions = [
    { value: "Full Access", label: "Full Access" },
    { value: "Limited Access", label: "Limited Access" }
];

export default RoleForm;