import { Grid } from "@mui/material";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import TextFieldUi from "../ui/TextField";
import ButtonSmallUi from "../ui/ButtonSmall";
import SelectDropdown from "../ui/SelectDropdown";
import DatePickerUi from "../ui/DatePicker";
import RadioUi from "../ui/RadioGroup";
import { log } from "console";

type FormFieldProps = {
  [key: string]: string;
};

interface FieldConfig {
  name: string;
  placeholder: string;
  type: any;
  options?: { value: string; label: string }[];
  subFields?: any;
}

interface FormConfig {
  fields: FieldConfig[];
}


const SubFieldRenderer: React.FC<{ subFields: FieldConfig[] }> = ({ subFields }) => {
  console.log(subFields);
  return (
    <>
      {subFields.map((field, index) => {
        if (field.type === "text") {
          return <TextFieldRenderer key={index} field={field} />;
        } else if (field.type === "select") {
          return <DropdownFieldRenderer key={index} field={field} />;
        } else if (field.type === "date") {
          return <DateFieldRenderer key={index} field={field} />;
        } else if (field.type === "radio") {
          return <RadioFieldRenderer key={index} field={field} />;
        } else if (field.type === "object") {
          return <SubFieldRenderer key={index} subFields={field.subFields} />;
        } else {
          return null;
        }
      })}

    </>
  );
};


const FormField = ({ updateFormValue, setFormData }: any) => {
  const { setFieldValue, values } = useFormikContext<FormFieldProps>();
  console.log(values);

  useEffect(() => {
    if (values) {
      setFormData(values);
    }
  }, [values, setFormData]);

  useEffect(() => {
    updateFormValue(setFieldValue);
  }, [updateFormValue, setFieldValue]);

  return (
    <div>
      <Grid container>
        <FormFields />
        <ButtonSmallUi label="Submit" type="submit" />
      </Grid>
    </div>
  );
};

const FormFields = () => {
  const formConfig: FormConfig = {
    fields: [
      { name: "firstName", placeholder: "First Name", type: "text" },
      { name: "lastName", placeholder: "Last Name", type: "text" },
      { name: "email", placeholder: "Email", type: "text" },
      { name: "age", placeholder: "Age", type: "number" },
      { name: "address", placeholder: "Address", type: "text" },
      { name: "subscribe", placeholder: "Subscribe", type: "checkbox" },
      { name: "customDate", placeholder: "Custom Date", type: "date" },
      {
        name: "gender",
        placeholder: "Gender",
        type: "select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "color",
        placeholder: "Color",
        type: "radio",
        options: [
          { value: "red", label: "Red" },
          { value: "blue", label: "Blue" },
        ],
      },
      {
        name: "nestedObject",
        placeholder: "Nested Object",
        type: "object",
        subFields: [
          { name: "addressOne", placeholder: "addressOne", type: "text" },
          { name: "addressTwo", placeholder: "addressTwo", type: "text" },
          { name: "addressThree", placeholder: "addressThree", type: "text" },
        ],
      },
    ],

  };

  return (
    <>
      {formConfig.fields.map((field, index) => {
        if (field.type === "text") {
          return <TextFieldRenderer key={index} field={field} />;
        } else if (field.type === "select") {
          return <DropdownFieldRenderer key={index} field={field} />;
        } else if (field.type === "date") {
          return <DateFieldRenderer key={index} field={field} />;
        } else if (field.type === "radio") {
          return <RadioFieldRenderer key={index} field={field} />;
        } else if (field.type === "object") {
          return <SubFieldRenderer key={index} subFields={field.subFields} />;
        } else {
          return null;
        }
      })}

    </>
  );
};

interface FieldRendererProps {
  field: FieldConfig;
}

const DropdownFieldRenderer: React.FC<FieldRendererProps> = ({ field }) => {
  const { values, setFieldValue } = useFormikContext<FormFieldProps>();
  console.log(values);

  const handleChange = (selectedValue: any | null) => {
    if (selectedValue) {
      setFieldValue(field.name, selectedValue.value);
    } else {
      setFieldValue(field.name, null);
    }
  };

  return (
    <Grid item xs={6}>
      <SelectDropdown
        onChange={handleChange}
        options={field.options || []}
        value={values[field.name] ? { value: values[field.name], label: values[field.name] } : null}
        labelText={field.placeholder} // Use placeholder as labelText
      />
    </Grid>
  );
};

const TextFieldRenderer: React.FC<FieldRendererProps> = ({ field }) => {
  const { values, setFieldValue } = useFormikContext<FormFieldProps>();
  console.log(values);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNested = field.name.includes(".");

    if (isNested) {
      setFieldValue(field.name, e.target.value);
    } else {
      const nestedFieldName = `address.${field.name}`;
      setFieldValue(field.name, e.target.value);
      setFieldValue(nestedFieldName, e.target.value);
    }
  };

  return (
    <Grid item xs={6}>
      <TextFieldUi
        type={field.type}
        label={field.placeholder}
        name={field.name}
        value={values[field.name] || ""}
        onChange={handleChange}
      />
    </Grid>
  );
};

const DateFieldRenderer: React.FC<FieldRendererProps> = ({ field }) => {
  const { values, setFieldValue } = useFormikContext<FormFieldProps>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, e);
  };

  return (
    <Grid item xs={6}>
      <DatePickerUi
        label={field.placeholder}
        value={values[field.name]}
        onChange={handleChange}
      />
    </Grid>
  );
};

const RadioFieldRenderer: React.FC<FieldRendererProps> = ({ field }) => {
  const { values, setFieldValue } = useFormikContext<FormFieldProps>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, e.target.value);
  };

  return (
    <Grid item xs={6}>
      <RadioUi
        options={field.options || []} value={values[field.name]} onChange={handleChange}
      />
    </Grid>
  );
};

const DynamicForm = () => {
  const [formValues, setFormValues] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    color: "",
    address: {
      addressOne: '',
      addressTwo: '',
      addressThree: '',
    }
  });
  const [formData, setFormData] = useState<FormFieldProps | undefined>();

  const updateFormValue = (setFieldValue: Function) => {

  };

  return (
    <div>
      <h1>{"Formik Context"}</h1>
      <Formik
        onSubmit={async (values) => {
          console.log(values);
        }}
        initialValues={formValues}
      >
        <Form>
          <FormField setFormData={setFormData} updateFormValue={updateFormValue} />
        </Form>
      </Formik>
    </div>
  );
};

export default DynamicForm;
