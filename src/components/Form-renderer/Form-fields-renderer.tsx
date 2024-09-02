import React, { useState, useEffect, useMemo } from 'react';
import { Field, FieldArray, useFormikContext } from "formik";
import SelectDropdown from "../ui/SelectDropdown";
import TextFieldUi from "../ui/TextField";
import RadioUi from "../ui/RadioGroup";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { FieldProps, SubField } from "../../types/types";
import DatePickerUi from "../ui/DatePicker";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import TextAreaUi from "../ui/TextArea";
import { Country, State, City } from 'country-state-city';
import { generateOptions } from '../../services/utils/dropdownOptions';
import { VisibilityOff, VisibilityOutlined } from '@mui/icons-material';
import PhoneInputUi from '../ui/PhoneNumber';

interface RenderCountrySelectFieldProps {
  field: any;
  meta: any;
  subField: SubField;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  options: any;
}

// -------------------------country select filed--------------------------
const RenderCountrySelectField: React.FC<RenderCountrySelectFieldProps> = ({ field, meta, subField, setFieldValue, options }) => {
  return (
    <Field name={subField.name} required={true} disabled={false}>
      {({ field: { value, onChange } }: any) => (
        <SelectDropdown
          required={subField.required}
          disabled={subField.disabled}
          labelText={subField.label}
          value={options.find((opt: { value: any; }) => opt.value === value)}
          onChange={(newValue) => {
            if (newValue) {
              onChange(newValue.value);
              setFieldValue(subField.name, newValue.value);
            } else {
              setFieldValue(subField.name, '');
              onChange("");
            }
          }}
          options={options}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    </Field>
  );
};

// -----------------select dropdown field--------------------
const renderSelectField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,) => {

  const options = subField.options?.map((option: { value: any; label: any; }) => ({
    value: option.value,
    label: option.label
  })) || [];

  return (
    <Field name={subField.name} required={true} disabled={false}>
      {({ field: { value, onChange } }: any) => (
        <SelectDropdown
          required={subField.required}
          disabled={subField.disabled}
          labelText={subField.label}
          value={options.find((opt: { value: any; }) => opt.value === value)}
          onChange={(newValue) => {
            if (newValue) {
              onChange(newValue.value);
              setFieldValue(subField.name, newValue.value);
            } else {
              setFieldValue(subField.name, '');
              onChange("");
            }
          }}
          options={options}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    </Field>
  );

};

// --------------------input field renderer-------------------
const renderTextField = (field: any, meta: any, subField: SubField) => {

  console.log("meta, field, subField", meta, field, subField);

  return (
    <TextFieldUi
      required={subField.required}
      disabled={subField.disabled}
      {...field}
      // variant="outlined"
      // margin="normal"
      value={field.value || ""}
      startAdornment={subField.startAdornment ? <span>{subField.startAdornment}</span> : undefined}
      endAdornment={subField.endAdornment ? <span>{subField.endAdornment}</span> : undefined}
      type={subField.type}
      fullWidth
      id={subField.name}
      label={subField.label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : subField.helperText}
    />
  )
}
// --------------------Phone field renderer-------------------

const renderPhoneField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
  console.log("meta, field, subField", meta, field, subField);

  return (
    <PhoneInputUi
      value={field.value || ""}
      onChange={field.onChange(field.name)}
      required={subField.required}
      disabled={subField.disabled}
      label={subField.label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : subField.helperText}
      fullWidth
      width={subField.width || '100%'}
    />
  );
};
//------------------password input field--------------------
const renderPasswordField = (field: any, meta: any, subField: SubField, passwordVisible: boolean, setPasswordVisible: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }) => (
  //return (
  <TextFieldUi
    required={subField.required}
    disabled={subField.disabled}
    {...field}
    endAdornment={passwordVisible ? <IconButton onClick={() => {
      setPasswordVisible(!passwordVisible)
    }}>
      <VisibilityOutlined />
    </IconButton> : <IconButton onClick={() => {
      setPasswordVisible(!passwordVisible)
    }}>
      <VisibilityOff />
    </IconButton>}
    value={field.value || ""}
    startAdornment={subField.startAdornment ? <span>{subField.startAdornment}</span> : undefined}
    //endAdornment={subField.endAdornment ? <span>{subField.endAdornment}</span> : undefined}
    type={passwordVisible ? 'text' : subField.type}
    fullWidth
    id={subField.name}
    label={subField.label}
    error={meta.touched && !!meta.error}
    helperText={subField?.helperText}
  />
  //)
);

// --------------------- text area filed--------------------
const renderTextArea = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => (
  <TextAreaUi
    required={subField.required}
    disabled={subField.disabled}
    {...field}
    // variant="outlined"
    // margin="normal"
    value={field.value || ""}
    startAdornment={subField.startAdornment ? <span>{subField.startAdornment}</span> : undefined}
    endAdornment={subField.endAdornment ? <span>{subField.endAdornment}</span> : undefined}
    type={subField.type}
    fullWidth
    rows={subField.rows || 3}
    id={subField.name}
    label={subField.label}
    error={meta.touched && !!meta.error}
    helperText={subField?.helperText}
    onChange={(e: any) => {
      if (e) {
        setFieldValue(subField.name, e.target.value);
      } else {
        setFieldValue(subField.name, '');
      }
    }}
  />
);

//------------------date time picker--------------------
const renderDatePickerField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => (
  <DatePickerUi
    required={subField.required}
    disabled={subField.disabled}
    {...field}
    label={subField.label}
    value={field.value}
    onChange={(date: any) => {
      if (date) {
        setFieldValue(subField.name, date);
      } else {
        setFieldValue(subField.name, '');
      }
    }}
    error={meta.touched && !!meta.error}
    helperText={meta.touched && meta.error}
  />
);

//----------------------radio fields---------------------
const renderRadioField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
  const options: any = subField.options?.map(option => ({
    value: option.value,
    label: option.label
  })) || [];

  return (
    <RadioUi errorMsg={meta.touched && meta.error} options={options} value={field.value} onChange={(newValue: any) => {
      if (newValue) {
        setFieldValue(subField.name, newValue.target.value);
      } else {
        setFieldValue(subField.name, '');
      }
    }}
    />
  );
};

type FormFieldProps = {
  [key: string]: string;
};

interface FieldRendererProps {
  updateFormValue: any;
  setData: any;
  field: FieldProps;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ updateFormValue, field, setFieldValue, setData }) => {


  const filteredData = field.subFields?.filter((data) => data.type === "selectCountry" || data.type === "selectState" || data.type === "selectCity");


  const { values } = useFormikContext<FormFieldProps>();

  const countryOptionsGenerate = useMemo(
    () => generateOptions(Country.getAllCountries(), "name", "isoCode"),
    []
  );

  const [countryOptions, setCountryOptions] = useState<any[]>(countryOptionsGenerate || []);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);


  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (filteredData) {
      const selectedCountryField = filteredData.find((data) => data.type === "selectCountry");
      const selectedStateField = filteredData.find((data) => data.type === "selectState");

      if (!selectedCountryField || !selectedStateField) return;

      const getStateByIsoCode = State.getStatesOfCountry(values[selectedCountryField.name]);
      const stateOptionsData = generateOptions(getStateByIsoCode, "name", "isoCode");
      setStateOptions(stateOptionsData);

      const citiesOfAllStates = City.getCitiesOfState(values[selectedCountryField.name], values[selectedStateField.name]);

      const generateCityOptions = generateOptions(citiesOfAllStates, "name", "name");
      setCityOptions(generateCityOptions);

    }
  }, [values]);



  // Memoize the updateFormValue function to prevent unnecessary re-renders
  const memoizedUpdateFormValue = useMemo(() => updateFormValue, [updateFormValue]);

  useEffect(() => {
    if (setData) {
      setData(values);
    }
  }, [values, setData]);

  useEffect(() => {
    if (memoizedUpdateFormValue) {
      memoizedUpdateFormValue(setFieldValue);
    }
  }, [memoizedUpdateFormValue, setFieldValue]);

  switch (field.type) {
    case 'section':
      return (
        <>
          <Grid item xs={field?.titleGridSize}>
            <Typography variant="body2" gutterBottom>{field?.label}</Typography>
          </Grid>
          {field.subFields?.map((subField: SubField) => (
            <Grid pb={2} pl={2} xs={subField.gridSize} key={subField.name}>
              <Field name={subField.name}>
                {({ field, meta }: any) => {
                  if (subField.type === "date") {
                    return renderDatePickerField(field, meta, subField, setFieldValue);
                  } else if (subField.type === "select") {
                    return renderSelectField(field, meta, subField, setFieldValue,);

                  } else if (subField.type === "radio") {
                    return renderRadioField(field, meta, subField, setFieldValue);
                  } else if (subField.type === "textArea") {
                    return renderTextArea(field, meta, subField, setFieldValue);
                  }
                  else if (subField.type === "PhoneNumber") {
                    return renderPhoneField(field, meta, subField, setFieldValue);
                  } else if (subField.type === "selectCountry" || subField.type === "selectState" || subField.type === "selectCity") {
                    let options = [];
                    if (subField.type === "selectCountry") {
                      options = countryOptions;
                    } else if (subField.type === "selectState") {
                      options = stateOptions;
                    } else if (subField.type === "selectCity") {
                      options = cityOptions;
                    }
                    return (
                      <RenderCountrySelectField
                        options={options}
                        field={field}
                        meta={meta}
                        subField={subField}
                        setFieldValue={setFieldValue}
                      />
                    )
                  }
                  else if (subField.type === 'password') {
                    return renderPasswordField(field, meta, subField, passwordVisible, setPasswordVisible)
                  }
                  else {
                    return renderTextField(field, meta, subField);
                  }
                }}
              </Field>
            </Grid>
          ))}
        </>
      );
    case 'array':
      return (
        <>
          <Grid item xs={field?.titleGridSize}>
            <Typography variant="body2" gutterBottom>{field?.label}</Typography>
          </Grid>
          <FieldArray name={field.name}>
            {({ push, remove, form }: any) => (
              <>
                {form.values[field.name]?.map((item: any, index: number) => (
                  <React.Fragment key={index}>
                    {field.subFields?.map((subField: SubField) => (
                      <Grid pb={2} pl={2} xs={subField.gridSize} key={subField.name}>
                        <Field name={`${field.name}.${index}.${subField.name}`}>
                          {({ field, meta }: any) => (
                            renderTextField(field, meta, subField)
                          )}
                        </Field>
                      </Grid>
                    ))}
                    <Grid sx={{ display: "flex" }}>
                      <Box sx={{ border: '1px solid #c4c4c4', borderRadius: 2, p: 1, height: "17px", display: "flex", ml: 3 }}>
                        <IconButton size='small' onClick={() => remove(index)}>
                          <DeleteIcon sx={{ color: `#ed5d5a`, fontSize: "18px" }} />
                        </IconButton>
                      </Box>
                      <Box sx={{ border: '1px solid #c4c4c4', borderRadius: 2, p: 1, height: "17px", display: "flex", ml: 3 }}>
                        <IconButton size='small' color="primary" onClick={() => push({})}>
                          <AddIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </React.Fragment>
                ))}
              </>
            )}
          </FieldArray>
        </>
      );
    case 'object':
      return (
        <div>
          <Typography variant="body2" gutterBottom>{field?.label}</Typography>
          {field.subFields?.map((subField: SubField) => (
            <div key={subField.name}>
              <Field name={`${field.name}.${subField.name}`}>
                {({ field, meta }: any) => (
                  renderTextField(field, meta, subField)
                )}
              </Field>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};