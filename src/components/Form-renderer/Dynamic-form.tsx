import { useNavigate } from 'react-router-dom';
import usePathname from '../../hooks/usePathname';
import { FieldProps, FormProps } from '../../types/types';
import { Form, Formik } from 'formik';
import TableHeader from '../layouts/TableHeader';
import { Grid } from '@mui/material';
import { FieldRenderer } from './Form-fields-renderer';
import { KeyboardBackspaceTwoTone, Save } from '@mui/icons-material';
import SnackBarUi from '../ui/Snackbar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { clearData } from '../../redux-store/global/globalState';

export const DynamicFormCreate = ({
  buttons,
  toastMessage,
  isSuccessToast,
  error,
  headerName,
  setData,
  updateFormValue,
  showTable,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
}: FormProps) => {
  const pathname = usePathname();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(clearData());
    navigate(-1);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          isValid,
          dirty,
        }) => {
          const defaultButtons = [
            {
              label: 'Back',
              icon: KeyboardBackspaceTwoTone,
              onClick: handleClick,
            },
            { label: 'Save', icon: Save, onClick: handleSubmit },
          ];

          const resolvedButtons = buttons
            ? buttons.map((button: any) => ({
                ...button,
                onClick: button.label ? handleSubmit : button.onClick,
              }))
            : defaultButtons;

          return (
            <>
              {showTable && (
                <TableHeader
                  headerName={headerName ?? pathname}
                  buttons={resolvedButtons}
                />
              )}
              <Form>
                {fields?.map((field: FieldProps) => (
                  <Grid item key={field.id} container spacing={2}>
                    <FieldRenderer
                      updateFormValue={updateFormValue}
                      setData={setData}
                      field={field}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                ))}
              </Form>
              <SnackBarUi
                message={
                  isSuccessToast
                    ? `${toastMessage}`
                    : `Error: ${error?.message ?? 'Unknown error occurred'}`
                }
                severity={isSuccessToast ? 'success' : 'error'}
                isSubmitting={isSuccessToast}
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
};
