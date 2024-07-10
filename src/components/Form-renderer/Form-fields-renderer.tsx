import React, { useState, useEffect, useMemo } from 'react';
import { Field, FieldArray, useFormikContext } from "formik";
import SelectDropdown from "../ui/SelectDropdown";
import TextFieldUi from "../ui/TextField";
import RadioUi from "../ui/RadioGroup";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ButtonSmallUi from "../ui/ButtonSmall";
import { FieldProps, SubField } from "../../types/types";
import DatePickerUi from "../ui/DatePicker";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import TextAreaUi from "../ui/TextArea";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Country, State, City } from 'country-state-city';
import { generateOptions } from '../../services/utils/dropdownOptions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { setCountry, setData } from '../../redux-store/global/globalState';
import { getStateByCodeAndCountry } from 'country-state-city/lib/state';

console.log("Hello world", Country.getAllCountries());

const country = Country.getAllCountries();

// iso code to get all states of countries ...
console.log("country", country);

console.log("Hello world", City.getCitiesOfState("IN", "TN"));
console.log("Hello world", State.getStatesOfCountry("IN"));


const countryOptions = generateOptions(Country.getAllCountries(), "name", "isoCode");
console.log("countryOptions", countryOptions);

interface RenderCountrySelectFieldProps {
  field: any;
  meta: any;
  subField: SubField;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  options: any;
}

const RenderCountrySelectField: React.FC<RenderCountrySelectFieldProps> = ({
  field,
  meta,
  subField,
  setFieldValue,
  options
}) => {
  console.log("options", options);

  return (
    <Field name={subField.name} required={true} disabled={false}>
      {({ field: { value, onChange } }: any) => (
        <SelectDropdown
          required={true}
          disabled={false}
          labelText={subField.label}
          value={options.find((opt: { value: any; }) => opt.value === value)}
          onChange={(newValue) => {
            if (newValue) {
              onChange(newValue.value);
              setFieldValue(subField.name, newValue.value);
              // dispatch(setCountry({ country: newValue.value })); // Dispatch setCountry action with an object
            } else {
              setFieldValue(subField.name, '');
              onChange("");
              // dispatch(setCountry({ country: '' })); // Dispatch setCountry action with an empty string object
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



const renderStateSelectField = (
  field: any,
  meta: any,
  subField: SubField,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  stateOptions: { value: any; label: any; }[]
) => (
  <Field name={subField.name} required={true} disabled={false}>
    {({ field: { value, onChange } }: any) => (
      <SelectDropdown
        required={true}
        disabled={false}
        labelText={subField.label}
        value={stateOptions.find((opt: { value: any; }) => opt.value === value)}
        onChange={(newValue) => {
          if (newValue) {
            onChange(newValue.value);
            setFieldValue(subField.name, newValue.value);
          } else {
            setFieldValue(subField.name, '');
            onChange("");
          }
        }}
        options={stateOptions}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    )}
  </Field>
);




const renderSelectField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,) => {

  const options = subField.options?.map((option: { value: any; label: any; }) => ({
    value: option.value,
    label: option.label
  })) || [];

  return (
    <Field name={subField.name} required={true} disabled={false}>
      {({ field: { value, onChange } }: any) => (
        <SelectDropdown
          required={true}
          disabled={false}
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

const renderTextField = (field: any, meta: any, subField: SubField) => (
  <TextFieldUi
    required={true}
    disabled={false}
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
    helperText={subField?.helperText}
  />
);

const renderTextArea = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => (
  <TextAreaUi
    required={true}
    disabled={false}
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

const renderDatePickerField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => (
  <DatePickerUi
    required={true}
    disabled={false}
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

const renderRadioField = (field: any, meta: any, subField: SubField, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
  const options: any = subField.options?.map(option => ({
    value: option.value,
    label: option.label
  })) || [];

  return (
    <RadioUi errorMsg={meta.touched && meta.error} options={options} required={true} disabled={false} value={field.value} onChange={(newValue: any) => {
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

  console.log("field", field.subFields);

  const { values } = useFormikContext<FormFieldProps>();

  console.log("values", values);
  const country = Country.getAllCountries();
  const countryOptionsGenerate = generateOptions(Country.getAllCountries(), "name", "isoCode");
  console.log("countryOptions", countryOptionsGenerate);

  const [countryOptions, setCountryOptions] = useState<any[]>(countryOptionsGenerate || []);
  // country
  // const countryData = useSelector((state: any) => state.globalState.data);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  // console.log("countryData", countryData);
  const state = State.getAllStates();
  console.log("state", state);

  useEffect(() => {
    if (values) {
      const getStateByIsoCode = State.getStatesOfCountry(values.country);
      console.log("getStateByIsoCode", getStateByIsoCode);
      console.log(getStateByIsoCode);
      const stateOptionsData = generateOptions(getStateByIsoCode, "name", "isoCode");
      setStateOptions(stateOptionsData)
      const citiesOfAllStates = City.getCitiesOfState(values.country, values.state);
      const generateCityOptions = generateOptions(citiesOfAllStates, "name", "name")
      setCityOptions(generateCityOptions);
      console.log("citiesOfAllStates", generateCityOptions);
    }
  }, [values]);

  console.log("selectedCountry", stateOptions);

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
                  } else if (subField.type === "selectCountry" || "selectState" || "selectCity") {
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
                    );
                  } else if (subField.type === "radio") {
                    return renderRadioField(field, meta, subField, setFieldValue);
                  } else if (subField.type === "textArea") {
                    return renderTextArea(field, meta, subField, setFieldValue);
                  } else {
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