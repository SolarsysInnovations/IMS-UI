import { Field, Form, Formik } from "formik";
import { useState } from "react";

export default function DemoForm() {
    const [someField, setSomeField] = useState<any>("");

    const handleSomething = (childFormValues: any, setFieldValue: any) => {
        setSomeField(childFormValues.firstName); // Set someField to the firstName value from the child form

        // Update lastName based on firstName
        if (childFormValues.firstName === "Arun") {
            // Set lastName immediately
            setFieldValue("lastName", "Sachin");
        }
    };

    return (
        <div className="DemoFOrm">
            <h1>Hello CodeSandbox</h1>
            <ChildForm handleSomething={handleSomething} />
            Email Address: {/* firstName; child form's firstName value  */}
        </div>
    );
}

const ChildForm = ({ handleSomething }: any) => {
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: ""
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
                handleSomething(values);
            }}
        >
            {({ setFieldValue }) => ( // Access setFieldValue from Formik context
                <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Jane" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" />

                    <label htmlFor="email">Email</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder="jane@acme.com"
                        type="email"
                    />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};
